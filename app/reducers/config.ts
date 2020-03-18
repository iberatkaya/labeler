import { SET_CONFIG, SET_OUTPUT, SET_CLASS, setOutputAction, setClassAction, setConfigAction } from '../actions/config';

export interface Config {
  outputDir: string,
  classNames: Array<string>
}

export function config(state: Config = {outputDir: '', classNames: []}, action: setConfigAction | setOutputAction | setClassAction) {
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
    default:
      return state;
  }
}
