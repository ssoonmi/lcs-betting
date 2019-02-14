import React from 'react';
import { connect } from 'react-redux';
import { makeBet } from '../../actions/bet_actions';

class TeamSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      team: props.team.team,
      showArrow: false,
    };
  }

  makeBet() {
    return e => {
      this.setState({ team: e.target.value, showForm: false });
      this.props.makeBet(e.target.value, this.props.username);
    };
  }

  render() {
    const { username, currentUser, team, match, team1, team2 } = this.props;
    if (username == currentUser && Date.parse(match.scheduledTime) > Date.now()) {
      if (this.state.showForm) {
        return (
          <>
            <div 
            className="select-modal" 
            onClick={() => this.setState({ showForm: false })}>
            </div>
            <select 
            value={team.team} 
            onBlur={() => this.setState({ showForm: false })}
            onChange={this.makeBet()}>
              <option value={team1.team}>{team1.acronym}</option>
              <option value={team2.team}>{team2.acronym}</option>
            </select>
          </>
        );
      } else {
        return (
          <div
            className="team-before-select"
            onMouseEnter={() => this.setState({ showArrow: true })}
            onMouseLeave={() => this.setState({ showArrow: false })}
            onClick={() => this.setState({ showForm: true })}>
            <span
              style={{
                color: team.acronym ? TEAM_COLORS[team.acronym].name : "inherit",
                opacity: (!match.winningTeamId || match.winningTeamId == team.team) ? 1 : 0.2
              }}>
              {team.acronym}
            </span>
            {this.state.showArrow ? (<i className="fas fa-caret-down"></i>) : (null)}
          </div>
        );
      }
    } else {
      return (
        <span
          style={{
            color: team.acronym ? TEAM_COLORS[team.acronym].name : "inherit",
            opacity: (!match.winningTeamId || match.winningTeamId == team.team) ? 1 : 0.2
          }}>
          {team.acronym}
        </span>
      );
    }
  }
}

const msp = (state, ownProps) => {
  const team1 = state.teams[ownProps.match.team1Id];
  const team2 = state.teams[ownProps.match.team2Id];
  const currentUser = state.session.currentUser;
  return {
    currentUser,
    team1,
    team2
  };
};

const mdp = (dispatch, ownProps) => {
  const matchId = ownProps.match.id;
  return {
    makeBet: (teamId, username) => dispatch(makeBet(matchId, teamId, username)),
  };
};

export default connect(msp, mdp)(TeamSelect);