import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { fetchTeams } from '../../actions/team_actions';
import { connect } from 'react-redux';
import TeamShow from './show';

class TeamIndex extends React.Component {
  componentDidMount() {
    if (!this.props.fetchedTeams) {
      this.props.fetchTeams();
    }
  }

  render() {
    
    const { teams, teamName } = this.props;
    let teamId;
    const teamLis = teams.map((team, idx) => {
      if (teamName == team.acronym) {
        teamId = team.team;
      }
      return (
        <li key={idx}><NavLink to={`/teams/${team.acronym}`}>{team.acronym}</NavLink></li>
      );
    });
    return (
      <article className="team-index">
        <section className="team-index-list">
          <ul>
            {teamLis}
          </ul>
        </section>
        {teamId ? <TeamShow teamId={teamId}/> : null}
      </article>

    );
  }
}

const msp = (state, ownProps) => {
  return {
    teamName: ownProps.match.params.teamName,
    teams: Object.values(state.teams),
    fetchedTeams: state.ui.fetchedTeams,
  };
};

const mdp = dispatch => {
  return {
    fetchTeams: () => dispatch(fetchTeams())
  };
}

export default withRouter(connect(msp, mdp)(TeamIndex));