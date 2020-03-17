import { Action } from "redux";

export const SET_CONFIG = 'SET_CONFIG';

export function setConfig(path: string) {
  return {
    type: SET_CONFIG,
    payload: path
  };
}

export interface setConfigAction extends Action {
  payload: string
}