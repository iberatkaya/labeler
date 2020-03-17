import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import {directory, pastdirectories} from './directory';
import config from './config';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    directory: directory,
    config: config
  });
}
