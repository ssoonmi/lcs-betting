import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { fetchTeams } from '../../actions/team_actions';
import { connect } from 'react-redux';
import TeamShow from './show';

class TeamIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {teamChange: false}
    this.teamItems = {};
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  componentDidMount() {
    if (!this.props.fetchedTeams) {
      this.props.fetchTeams();
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.teamName !== this.props.teamName) {
      this.setState({teamChange: true});
    } else if (oldProps.teamName === this.props.teamName && this.state.teamChange) {
      this.setState({teamChange: false});
    }
  }

  zoomIn(e) {
    const teamLogo = this.teamItems[e.target.id];
    const teamGradient = this.teamItems[parseInt(e.target.id) + 10000];

    teamLogo.style.width = `83%`;
    teamGradient.style.opacity = `0`;
  }

  zoomOut(e) {
    const teamLogo = this.teamItems[e.target.id];
    const teamGradient = this.teamItems[parseInt(e.target.id) + 10000];

    teamLogo.style.width = `75%`;
    teamGradient.style.opacity = `0.3`;
  }

  render() {
    
    const { teams, teamName } = this.props;
    let teamId;
    let teamLogos = {};

    if (teams[0].teams) {
      teams[0].teams.forEach(team => {
        teamLogos[team.id] = team.teamPhotoUrl
      })
    }
    const teamLis = teams.map((team, idx) => {
      if (teamName == team.acronym) {
        teamId = team.team;
      }

      return (
        <li
          key={idx}
          // ref={el => (this.teamItems[team.id] = el)}
          onMouseEnter={this.zoomIn}
          onMouseLeave={this.zoomOut}>
          <div className="team-gradient" 
               ref={el => (this.teamItems[team.id + 10000] = el)}/>
          <img className="team-index-logo" src={team.logoUrl}
               ref={el => (this.teamItems[team.id] = el)}/>
          <NavLink id={team.id} to={`/teams/${team.acronym}`}>
            {team.acronym}
          </NavLink>
        </li>
      );
    });



    return (
      <article className="team-index">
        <section className="team-index-list">
          <ul>
            {teamLis}
          </ul>
        </section>
        {!this.state.teamChange && teamId ? <TeamShow teamId={teamId}/> : null}
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