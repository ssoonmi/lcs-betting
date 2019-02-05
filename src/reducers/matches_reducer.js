import { RECEIVE_MATCHES } from '../actions/match_actions';

export default function (state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MATCHES:
      return action.matches;
    default:
      return state;
  }
}