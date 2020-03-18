import { Action } from "redux";

export const SET_DIR = 'SET_DIR';

export function setDir(path: string) {
  return {
    type: SET_DIR,
    payload: path
  };
}

export interface setDirAction extends Action {
  payload: string
}