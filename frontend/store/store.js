import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/root_reducer';

const defaultState = {};

export default function(preloadedState = defaultState) {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
}