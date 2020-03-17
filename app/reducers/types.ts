import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type directoryType = {
  directory: string;
};

export type GetState = () => directoryType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<directoryType, Action<string>>;
