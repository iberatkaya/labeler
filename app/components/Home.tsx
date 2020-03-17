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
//      db.set('history', ["test"]).write();
      let hist = db.get('history').value();
      setPast(hist);
    }
    loadFromDB();
  }, []);

  return (
    <div>
      <h2 className={styles.Home}>Labeler</h2>
      <a className={styles.Project}
        onClick={async () => {
          let res = await dialog.showOpenDialog({ properties: ['openDirectory'] })
          props.setDir(res.filePaths[0]);
          props.history.push(routes.LABEL)
          }}
      >Open a project</a>
      <div>
        {
          past.map((i) => (
            <a className={styles.Project}
              onClick={async () => {
                }}
              >{i}</a>
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
