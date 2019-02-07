import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER, RECEIVE_SESSION_ERRORS } from "../actions/user_actions";
import { merge } from 'lodash';

const defaultState = {
  currentUser: null,
  errors: [],
}

export default function(state = defaultState, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { currentUser: action.username, errors: [] };
        case REMOVE_CURRENT_USER: 
            return defaultState;
        case RECEIVE_SESSION_ERRORS:
            newState = merge({}, state);
            newState.errors = action.errors;
            return newState;
        default:
            return state;
    }
}

