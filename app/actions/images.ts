import { Action } from "redux";

export const SET_IMAGEPATHS = 'SET_IMAGEPATHS';

export function setImagePaths(images: Array<string>) {
  return {
    type: SET_IMAGEPATHS,
    payload: images
  };
}

export interface setImagePathAction extends Action {
  payload: Array<string>
}