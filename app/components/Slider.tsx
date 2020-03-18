import React, {useState, useEffect, useRef} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styles from './Slider.css';
import routes from '../constants/routes.json';
import ImageGallery from 'react-image-gallery';
import { FaChevronCircleLeft } from 'react-icons/fa';
import fs from 'fs';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { bindActionCreators } from 'redux';
import path from 'path';
import { Config } from '../reducers/config';
const fsp = fs.promises;

interface Props extends RouteComponentProps, StateRedux{
}

function Slider(props: Props) {
  const [imgIndex, setIndex] = useState<number>(0);
  let galleryRef = useRef<ImageGallery>(null);
  return (
    <div className={styles.Main}>
      <div className={styles.Back}>
        <Link to={routes.HOME}><FaChevronCircleLeft size={28} /></Link>
      </div>
      <div style={{width: '100vw', height: '100vh'}}>
        <div style={{marginTop: 12, marginRight: 12}}>
          <ImageGallery
            ref={galleryRef}
            items={props.imagePaths.map((i) => ({original: i}))}
            showThumbnails={false}
            showPlayButton={false}
            infinite={false}
            disableArrowKeys={true}
            showBullets={false}
            showNav={false}
          />
        </div>
        <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', marginTop: 12}}>
          {props.config.classNames.map((i) => (
            <Button variant="light" style={{marginRight: 12}}
              onClick = {async () => {
                let imageName = await path.parse(props.imagePaths[imgIndex]);
                await fsp.copyFile(props.imagePaths[imgIndex], path.resolve(props.directory, props.config.outputDir, i, imageName.base));
                if(imgIndex+1<props.imagePaths.length){
                  setIndex(imgIndex + 1);
                  galleryRef.current!.slideToIndex(imgIndex+1);
                }
                else{
                  alert("Finished!");
                  props.history.replace(routes.HOME)
                }
              }}  
            >
              {i}
            </Button>
          ))}
          <Button variant="light" style={{marginRight: 12}}
            onClick = {() => {
              if(imgIndex+1<props.imagePaths.length){
                setIndex(imgIndex + 1);
                galleryRef.current!.slideToIndex(imgIndex+1);
              }
              else{
                alert("Finished!");
                props.history.replace(routes.HOME)
              }
            }}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
}


interface StateRedux {
  directory: string,
  imagePaths: Array<string>,
  config: Config
}

const mapStateToProps = (state: StateRedux) => {
  const { directory, imagePaths, config } = state;
  return { directory, imagePaths, config };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
      {
      },
      dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Slider);