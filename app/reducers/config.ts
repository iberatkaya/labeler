import { SET_CONFIG, SET_OUTPUT, SET_CLASS, SET_INDEX, setOutputAction, setClassAction, setConfigAction, setIndexAction } from '../actions/config';

export interface Config {
  outputDir: string,
  classNames: Array<string>,
  index: number
}

export function config(state: Config = {outputDir: '', classNames: [], index: 0}, action: setConfigAction | setOutputAction | setClassAction | setIndexAction) {
  switch (action.type) {
    case SET_CONFIG:
      let configPayload = (action as setConfigAction).payload;
      return state = configPayload;
    case SET_OUTPUT:
      let outputPayload = (action as setOutputAction).payload;
      let outputState = {...state};
      outputState.outputDir = outputPayload;
      return outputState;
    case SET_CLASS:
      let classPayload = (action as setClassAction).payload;
      let classState = {...state};
      classState.classNames = classPayload;
      return classState;
    case SET_INDEX:
      let indexPayload = (action as setIndexAction).payload;
      let indexState = {...state};
      indexState.index = indexPayload;
      return indexState;
    default:
      return state;
  }
}
