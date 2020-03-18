import React, {useState, useEffect} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styles from './Label.css';
import routes from '../constants/routes.json';
import electron from 'electron';
import { FaChevronCircleLeft, FaPlayCircle } from 'react-icons/fa';
import fs from 'fs';
import { setClass, setConfig, setOutput } from '../actions/config';
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Config } from '../reducers/config';
const image2base64 = require('image-to-base64');
const fsp = fs.promises;

interface Props extends RouteComponentProps, StateRedux{
  setClass: typeof setClass
  setConfig: typeof setConfig
  setOutput: typeof setOutput
}

function Label(props: Props) {
  const dir = props.directory;
  const config = props.config;
  const [images, setImages] = useState<Array<string>>([]);
  const [numOfClasses, setNumOfClasses] = useState<number>(2);
  const [error, setError] = useState<boolean>(false);
  console.log(props.config);
  useEffect(() => {
    let loaddata = async () => {
      try{
        props.setClass([...Array(numOfClasses)].map(() => ''));
        const data = await fsp.readdir(dir);
        let base64data = [];
        for(let i in data){
          let str = await image2base64(dir + '/' + data[i]) as string;
          base64data.push(str);
        }
        if(base64data.length === 0)
          setError(true);
        else
          setImages(base64data as any as string[]);
      }catch(e){
        console.log(e);
        setError(true);
      }
    }
    loaddata()
  }, [dir]);
  if(error){
    return (
      <div className={styles.Main}>
        <div>
          <Link to={routes.HOME}><FaChevronCircleLeft size={28} /></Link>
        </div>
        <div>
          No images were found!
        </div>
      </div>
    );
  }
  return (
    <div className={styles.Main}>
      <div className={styles.Back}>
        <Link to={routes.HOME}><FaChevronCircleLeft size={32} /></Link>
      </div>
      <div>
        {
          images.length === 0 ? <div>Loading...</div> :
          <div > 
            <div className={styles.Center}>
              <a>
                <FaPlayCircle size="4rem" className={styles.Start}/>
              </a>
            </div>
            <Form>
              <Form.Group>
                <Form.Label>Output Folder Name:</Form.Label>
                <Form.Control value={config.outputDir} onChange={(e: React.FormEvent<HTMLInputElement>) => props.setOutput(e.currentTarget.value)} type="text"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Number Of Classes:</Form.Label>
                <Form.Control type="number" value={numOfClasses.toString()}  min={2} 
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    let num = parseInt(e.currentTarget.value);
                    setNumOfClasses(num); 
                    props.setClass([...Array(num)].map(() => ''));
                  }}/>
              </Form.Group>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {
                  config.classNames.map((i, index) => (
                    <Form.Group style={{marginRight: 12}}>
                      <Form.Label>Class {index+1}:</Form.Label>
                      <Form.Control type="text" value={i} onChange={(e: React.FormEvent<HTMLInputElement>) => {  
                        let classNames = config.classNames;
                        classNames[index] = e.currentTarget.value;
                        props.setClass(classNames);                  
                      }} />
                    </Form.Group>
                  ))              
                }
              </div>
            </Form>
            <div>
              Found {images.length} images:
            </div>
            <p>{images.map((i, index) => <img style={{width: 100, height: 100, padding: 2}} key={index} src={'data:image/jpeg;base64,' + i}/>)}</p>
          </div>
        }
      </div>
    </div>
  );
}


interface StateRedux {
  directory: string,
  config: Config
}

const mapStateToProps = (state: StateRedux) => {
  const { directory, config } = state;
  return { directory, config };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
      {
        setClass, 
        setConfig, 
        setOutput 
      },
      dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Label);