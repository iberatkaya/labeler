import { SET_CONFIG, setConfigAction } from '../actions/config';

export default function config(state = "", action: setConfigAction) {
  switch (action.type) {
    case SET_CONFIG:
      return state = action.payload;
    default:
      return state;
  }
}
