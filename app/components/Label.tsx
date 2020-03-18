import React, {useState, useEffect} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styles from './Label.css';
import routes from '../constants/routes.json';
import { FaChevronCircleLeft, FaPlayCircle } from 'react-icons/fa';
import fs from 'fs';
import { setClass, setConfig, setOutput } from '../actions/config';
import { setImagePaths } from '../actions/images';
import Form from 'react-bootstrap/Form'
import path from 'path';
import isImage from 'is-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Config } from '../reducers/config';
const fsp = fs.promises;

interface Props extends RouteComponentProps, StateRedux{
  setClass: typeof setClass,
  setConfig: typeof setConfig,
  setOutput: typeof setOutput,
  setImagePaths: typeof setImagePaths
}

function Label(props: Props) {
  const dir = props.directory;
  const config = props.config;
  const [numOfClasses, setNumOfClasses] = useState<number>(2);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    let loaddata = async () => {
      try{
        props.setClass([...Array(numOfClasses)].map(() => ''));
        const data = await fsp.readdir(dir);
        let paths = [];
        for(let i in data){
          let stat = await fsp.stat(path.resolve(dir, data[i]));
          if(stat.isFile() && isImage(data[i])){
            paths.push(path.resolve(dir, data[i]));
          }
        }
        if(paths.length === 0)
          setError(true);
        else{
          props.setImagePaths(paths);
        }
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
        <div className={styles.Back}>
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
          props.imagePaths.length === 0 ? <div>Loading...</div> :
          <div > 
            <div className={styles.Center}>
              <a
              onClick = { async () => {
                let empty = false;
                for(let i=0; i<props.config.classNames.length; i++){
                  if(props.config.classNames[i] === ''){
                    empty = true;
                    break;
                  }
                }
                if(props.config.outputDir === '' || empty){
                  alert('Please fill all inputs!');
                  return;
                }
                let same = false;
                for(let i=0; i<props.config.classNames.length; i++){
                  for(let j=i+1; j<props.config.classNames.length; j++){
                    if(props.config.classNames[i] === props.config.classNames[j]){
                      same = true;
                      break;
                    }
                  }
                }
                if(same){
                  alert('Classes cannot have the same name!');
                  return;
                }
                await createDir(path.resolve(props.directory, props.config.outputDir));
                for(let i=0; i<props.config.classNames.length; i++){
                  await createDir(path.resolve(props.directory, props.config.outputDir, props.config.classNames[i]));
                }
                props.history.push(routes.SLIDER);
              }}
              >
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
                <Form.Control type="number" value={numOfClasses.toString()}  min={2} max={100}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    let num = parseInt(e.currentTarget.value);
                    setNumOfClasses(num); 
                    props.setClass([...Array(num)].map(() => ''));
                  }}/>
              </Form.Group>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {
                  config.classNames.map((i, index) => (
                    <Form.Group key={index} style={{marginRight: 12}}>
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
              Found {props.imagePaths.length} images:
            </div>
            <p>{props.imagePaths.map((i, index) => <img style={{width: 100, height: 100, padding: 2}} key={index} src={i}/>)}</p>
          </div>
        }
      </div>
    </div>
  );
}


interface StateRedux {
  directory: string,
  config: Config,
  imagePaths: Array<string>
}

const mapStateToProps = (state: StateRedux) => {
  const { directory, config, imagePaths } = state;
  return { directory, config, imagePaths };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
      {
        setClass, 
        setConfig, 
        setOutput,
        setImagePaths 
      },
      dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Label);

let createDir = async (path: string) => {
  try {
      await fsp.access(path);
    }
  catch (e) {
      if (e.code === "ENOENT")
          await fsp.mkdir(path);
  }
}