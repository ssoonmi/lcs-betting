import { RECEIVE_TEAMS } from '../actions/team_actions';
import { RECEIVE_LCS_DATA } from '../actions/match_actions';
import { merge } from 'lodash';

export default function(state = {}, action) {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_LCS_DATA:
      newState = merge({}, state);
      action.teams.forEach((team) => {
        let found = false;
        let i = 0;
        while (!found && i < action.allTeams.length) {
          if (action.allTeams[i].id == team.team) {
            const teamInfo = action.allTeams[i];
            newState[team.id] = teamInfo;
            newState[team.id].team = team.id
            found = true;
          }
          i++;
        }
      });
      return newState;
    case RECEIVE_TEAMS:
      return action.teams;
    default:
      return state;
  }
}