import { SET_DIR, setDirAction, setPastDirAction } from '../actions/directory';

export function directory(state = "", action: setDirAction) {
  switch (action.type) {
    case SET_DIR:
      return state = action.payload;
    default:
      return state;
  }
}

export function pastdirectories(state: Array<string> = [], action: setPastDirAction) {
  switch (action.type) {
    case SET_DIR:
      return state = action.payload;
    default:
      return state;
  }
}
