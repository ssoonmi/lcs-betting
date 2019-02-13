import { BEGIN_LOADING, FINISH_LOADING, BEGIN_LOADING_TEAMS } from '../actions/ui_actions';
import { RECEIVE_TEAMS } from '../actions/team_actions';
import { START_FETCHING_TEAMS } from '../actions/ui_actions';
import { merge } from 'lodash';

const defaultState = {
  loading: true,
  teamLoading: false,
  fetchedTeams: false,
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
    case START_FETCHING_TEAMS:
      newState = merge({}, state);
      newState.fetchedTeams = true;
      return newState;
    case RECEIVE_TEAMS:
      newState = merge({}, state);
      newState.teamLoading = false;
      return newState;
    default:
      return state;
  }
}