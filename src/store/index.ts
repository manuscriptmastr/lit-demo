import { createConnect, createStore } from '../utils/store.js';
import { initialState } from './state.js';

export const store = createStore(initialState);
export const { update } = store;
export const connect = createConnect(store);
export * from './actions.js';
export * from './state.js';
