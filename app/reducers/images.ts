import { SET_IMAGEPATHS, setImagePathAction } from '../actions/images';

export function imagePaths(state: Array<string> = [], action: setImagePathAction) {
  switch (action.type) {
    case SET_IMAGEPATHS:
      return state = action.payload;
    default:
      return state;
  }
}