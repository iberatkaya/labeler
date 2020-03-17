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

export const SET_PASTDIR = 'SET_PASTDIR';

export function setPastDir(path: Array<string>) {
  return {
    type: SET_PASTDIR,
    payload: path
  };
}

export interface setPastDirAction extends Action {
  payload: Array<string>
}