import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import {directory} from './directory';
import {config} from './config';
import {imagePaths} from './images';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    directory,
    config,
    imagePaths
  });
}
