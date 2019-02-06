import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER } from "../actions/user_actions";
import { merge } from 'lodash';

const defaultState = {};

export default function (state = defaultState, action) {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.user.username]: action.user});
    case REMOVE_CURRENT_USER:
      newState = merge({}, state);
      delete newState[action.username];
      return newState;
    default:
      return state;
  }
}