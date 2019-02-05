import { combineReducers } from "redux";
import teams from './teams_reducer';
import matches from './matches_reducer';
import session from './session_reducer';
import users from './users_reducer';

export default combineReducers({
  teams,
  matches,
  session,
  users,  
});