import { RECEIVE_TEAMS } from '../actions/team_actions';

export default function(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TEAMS:
      return action.teams;
    default:
      return state;
  }
}