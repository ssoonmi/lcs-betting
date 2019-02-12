import { BEGIN_LOADING, FINISH_LOADING, FINISH_LOADING_TEAMS, BEGIN_LOADING_TEAMS } from '../actions/ui_actions';
import { merge } from 'lodash';

const defaultState = {
  loading: false,
  teamLoading: false,
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
    case BEGIN_LOADING_TEAMS:
      newState = merge({}, state);
      newState.teamLoading = true;
      return newState;
    case FINISH_LOADING_TEAMS:
      newState = merge({}, state);
      newState.teamLoading = false;
      return newState;
    default:
      return state;
  }
}