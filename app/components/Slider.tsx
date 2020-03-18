import React, {useState, useEffect} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styles from './Slider.css';
import routes from '../constants/routes.json';
import electron from 'electron';
import { FaChevronCircleLeft } from 'react-icons/fa';
import fs from 'fs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const image2base64 = require('image-to-base64');
const fsp = fs.promises;

interface Props extends RouteComponentProps, StateRedux{
}

function Slider(props: Props) {
  const dir = props.directory;
  const [images, setImages] = useState<Array<string>>([]);
  
  useEffect(() => {
    let loaddata = async () => {
      const data = await fsp.readdir(dir);
      let base64data = [];
      for(let i in data){
        let str = await image2base64(dir + '/' + data[i]) as string;
        base64data.push(str);
      }
      setImages(base64data as any as string[]);
    }
    loaddata()
  }, [dir]);
  return (
    <div className={styles.Main}>
      <div>
        <Link to={routes.HOME}><FaChevronCircleLeft size={28} /></Link>
      </div>
      <div>
        {
          images.length === 0 ? <div>Loading...</div> :
          <div > 
            <div className={styles.Main}>
              <a className={styles.Main}>
                Start
              </a>
            </div>
            <div style={{backgroundColor: 'red', width: 120}}>
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
  directory: string
}

const mapStateToProps = (state: StateRedux) => {
  const { directory } = state;
  return { directory };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
      {
      },
      dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Slider);