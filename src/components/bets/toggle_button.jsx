import React from 'react';
import { makeBet } from '../../actions/bet_actions';
import { connect } from 'react-redux';

class ToggleButton extends React.Component {
  render() {
    const { makeBet, selectedTeamId, team1, team2, username } = this.props;
    if (username) {
      const toggleTeamId = selectedTeamId == team1.id ? team2.id : team1.id;
      const selectedTeam = selectedTeamId == team1.id ? team1 : team2;
      return (
        <div className="bet-toggle-btn" onClick={() => makeBet(toggleTeamId, username)}>
          <div></div>
          <span>{selectedTeam.acronym}</span>
        </div>
      );
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
  if (username) {
    try {
      selectedTeamId = state.users[username].bets[match.id];
    } catch (err) {}
  }
  return {
    username,
    selectedTeamId,
    team1,
    team2
  };
};

const mdp = (dispatch, ownProps) => {
  const match = ownProps.match;
  return {
    makeBet: (teamId, username) => dispatch(makeBet(match.id, teamId, username)),
  };
};

export default connect(msp, mdp)(ToggleButton);