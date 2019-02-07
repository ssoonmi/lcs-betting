import { RECEIVE_MATCHES, RECEIVE_LCS_DATA } from '../actions/match_actions';
import { merge } from 'lodash';

export default function (state = {}, action) {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_LCS_DATA:
      newState = merge({}, state);
      action.matches.forEach((match) => {
        let found = false;
        let i = 0;
        while (!found && i < action.allMatches.length) {
          if (action.allMatches[i].match == match.id) {
            const time = action.allMatches[i].scheduledTime;
            const tags = action.allMatches[i].tags;
            match.team1Id = match.input[0].roster;
            match.team2Id = match.input[1].roster;
            match.scheduledTime = action.allMatches[i].scheduledTime;
            match.tags = action.allMatches[i].tags;
            match.tournament = action.allMatches[i].tournament;
            match.winningTeamId = null;
            if (match.state == 'resolved') {
              if (match.scores[match.team1Id] > match.scores[match.team2Id]) {
                match.winningTeamId = match.team1Id;
              } else {
                match.winningTeamId = match.team2Id;
              }
            }

            newState.weeks = newState.weeks || {};
            newState.weeks[tags.blockLabel] = newState.weeks[tags.blockLabel] || { days: {} };
            newState.weeks[tags.blockLabel].days[tags.subBlockLabel] = newState.weeks[tags.blockLabel].days[tags.subBlockLabel] || { matches: {} };
            newState.weeks[tags.blockLabel].days[tags.subBlockLabel].matches[time] = match;
            found = true;
          }
          i++;
        }
      });
      return newState;
    case RECEIVE_MATCHES:
      return action.matches;
    default:
      return state;
  }
}