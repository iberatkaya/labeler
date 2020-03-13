import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './Label.css';
import routes from '../constants/routes.json';
import electron from 'electron';
import fs from 'fs';
const fsp = fs.promises;
const image2base64 = require('image-to-base64');
const remote = electron.remote;
const dialog = remote.dialog;

export default function Counter() {
  const [dir, setDir] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);
  
  useEffect(() => {
    console.log('rerender')
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
    <div style={{overflowY: 'scroll', height: '99vh'}}>
      <div data-tid="backButton">
        <Link to={routes.HOME}>to Home</Link>
      </div>
      <div
        onClick={async () => {
          let res = await dialog.showOpenDialog({ properties: ['openDirectory'] })
          console.log(res.filePaths);
          setDir(res.filePaths[0])
        }}
      >
        Open folder
      </div>
      <div>
        {
          images.length === 0 ? <div>Loading...</div> :
          <div> 
            <div>
              Images:
            </div>
            <p>{images.map((i) => <img style={{width: 100, height: 100, padding: 2}} src={'data:image/jpeg;base64,' + i}/>)}</p>
          </div>
        }
      </div>
    </div>
  );
}
