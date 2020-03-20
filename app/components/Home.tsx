import React, {useState, useEffect} from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import electron from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDir } from '../actions/directory'
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
const remote = electron.remote;
const dialog = remote.dialog;

interface Props extends RouteComponentProps, StateRedux{
  setDir: typeof setDir
}


function Home(props: Props) {
  let [past, setPast] = useState<Array<string>>([]);
  useEffect(() => {
    let loadFromDB = async () => {
      const adapter = new FileSync('db.json');
      const db = low(adapter);
      let hist = db.get('history').value();
      if(hist === undefined){
        db.set('history', []).write();
        console.log('setted');
      }
      else
        setPast(hist.reverse());
    }
    loadFromDB();
  }, []);
  return (
    <div className={styles.Main}>
      <h2 className={styles.Home}>Labeler</h2>
      <div className={styles.Project}>
        <a
          onClick={async () => {
            const adapter = new FileSync('db.json');
            const db = low(adapter);
            let res = await dialog.showOpenDialog({ properties: ['openDirectory'] })
            props.setDir(res.filePaths[0]);
            let hist = db.get('history').value();
            let exists = false;
            for(let i in hist){
              if(hist[i] === res.filePaths[0]){
                exists = true;
                break;
              }
            }
            if(!exists){
              hist.push(res.filePaths[0]);
              console.log(hist);
              db.set('history', hist).write();
              setPast(hist);
            }    
            props.history.push(routes.LABEL); 
          }}
        >Open a project</a>
      </div>
      <div>
        {
          past.slice(0, 7).map((i, index) => (
            <div key={index}>
              <a className={styles.Past}
                onClick={async () => {
                  props.setDir(i);
                  props.history.push(routes.LABEL); 
                }}
                >{i}</a>
              </div>
          ))
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
        setDir
      },
      dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
