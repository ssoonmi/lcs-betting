import { RECEIVE_USERS } from "../actions/user_actions";

const defaultState = {};

export default function (state = defaultState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS: 
      return action.users || {};
    default:
      return state;
  }
}