import { SET_DIR, setDirAction } from '../actions/directory';

export function directory(state = "", action: setDirAction) {
  switch (action.type) {
    case SET_DIR:
      return state = action.payload;
    default:
      return state;
  }
}