import { BEGIN_LOADING, FINISH_LOADING } from '../actions/ui_actions';
import { merge } from 'lodash';

const defaultState = {
  loading: false,
};

export default function(state = defaultState, action) {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case BEGIN_LOADING:
      newState = merge({}, state);
      newState.loading = true;
      return newState;
    case FINISH_LOADING:
      newState = merge({}, state);
      newState.loading = false;
      return newState;
    default:
      return state;
  }
}