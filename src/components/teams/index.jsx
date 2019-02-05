import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { fetchTeams } from '../../actions/team_actions';
import { connect } from 'react-redux';
import TeamShow from './show';

class TeamIndex extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }

  render() {
    const { teams } = this.props;
    const teamLis = teams.map((team, idx) => {
      return (
        <li key={idx}><NavLink to={`/teams/${team.tag}`}>{team.tag}</NavLink></li>
      );
    });
    return (
      <article className="team-index">
        <section className="team-index-list">
          <ul>
            {teamLis}
          </ul>
        </section>
        {this.props.teamName ? <TeamShow/> : null}
      </article>

    );
  }
}

const msp = (state, ownProps) => {
  return {
    teamName: ownProps.match.params.teamName,
    teams: Object.values(state.teams),
  };
};

const mdp = dispatch => {
  return {
    fetchTeams: () => dispatch(fetchTeams())
  };
}

export default withRouter(connect(msp,mdp)(TeamIndex));