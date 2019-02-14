import React from 'react';
import { makeBet } from '../../actions/bet_actions';
import { connect } from 'react-redux';

class ToggleButton extends React.Component {
  render() {
    const { makeBet, selectedTeamId, team1, team2, username, match, winningTeam } = this.props;
    if (username) {
      if (match.state == "unresolved") {
        if (selectedTeamId) {
          const toggleTeamId = selectedTeamId == team1.team ? team2.team : team1.team;
          const selectedTeam = selectedTeamId == team1.team ? team1 : team2;
          const isReverse = selectedTeamId == team2.team ? " moved" : "";
          return (
            <div 
              style={{
                backgroundColor: TEAM_COLORS[selectedTeam.acronym].main,
                opacity: (Date.parse(match.scheduledTime) > Date.now()) ? 1 : 0.5
              }}
              className={"bet-toggle-btn" + isReverse}
              onClick={() => {
                if (Date.parse(match.scheduledTime) > Date.now()) {
                  makeBet(toggleTeamId, username);
                }
              }}>
              <div 
                style={{ backgroundColor: TEAM_COLORS[selectedTeam.acronym].second }}>
              </div>
              <span 
                style={{ color: TEAM_COLORS[selectedTeam.acronym].text }}>
                {selectedTeam.acronym}
              </span>
            </div>
          );
        } else {
          return (
            <>
              <div>
                Bet on:
              </div>
              <div className="bet-team-btns">
                <div
                  style={{ 
                    backgroundColor: TEAM_COLORS[team1.acronym].main,
                    opacity: (Date.parse(match.scheduledTime) > Date.now()) ? 1 : 0.5
                  }}
                  onClick={() => {
                    if (Date.parse(match.scheduledTime) > Date.now()) {
                      makeBet(team1.team, username);
                    }
                  }}>
                  <span
                    style={{ color: TEAM_COLORS[team1.acronym].text }}>
                    {team1.acronym}
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: TEAM_COLORS[team2.acronym].main,
                    opacity: (Date.parse(match.scheduledTime) > Date.now()) ? 1 : 0.5
                  }}
                  onClick={() => {
                    if (Date.parse(match.scheduledTime) > Date.now()) {
                      makeBet(team2.team, username);
                    }
                  }}>
                  <span
                    style={{ color: TEAM_COLORS[team2.acronym].text }}>
                    {team2.acronym}
                  </span>
                </div>
              </div>
            </>
          );
        }
      } else {
        return (null);
      }
    } else {
      return (null);
    }
  }
}

const msp = (state, ownProps) => {
  const username = state.session.currentUser;
  const match = ownProps.match;
  let selectedTeamId;
  const team1 = state.teams[match.team1Id];
  const team2 = state.teams[match.team2Id];
  const winningTeam = state.teams[match.winningTeamId];
  if (username) {
    try {
      selectedTeamId = state.users[username].bets[match.id];
    } catch (err) {}
  }
  return {
    username,
    selectedTeamId,
    team1,
    team2,
    winningTeam,
    match
  };
};

const mdp = (dispatch, ownProps) => {
  const match = ownProps.match;
  return {
    makeBet: (teamId, username) => dispatch(makeBet(match.id, teamId, username)),
  };
};

export default connect(msp, mdp)(ToggleButton);