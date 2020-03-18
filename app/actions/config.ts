import { Action } from "redux";
import { Config } from "../reducers/config";

export const SET_CONFIG = 'SET_CONFIG';

export function setConfig(obj: string) {
  return {
    type: SET_CONFIG,
    payload: obj
  };
}

export interface setConfigAction extends Action {
  payload: Config
}

export const SET_OUTPUT = 'SET_OUTPUT';

export function setOutput(path: string) {
  return {
    type: SET_OUTPUT,
    payload: path
  };
}

export interface setOutputAction extends Action {
  payload: string
}

export const SET_CLASS = 'SET_CLASS';

export function setClass(classes: Array<string>) {
  return {
    type: SET_CLASS,
    payload: classes
  };
}

export interface setClassAction extends Action {
  payload: Array<string>
}