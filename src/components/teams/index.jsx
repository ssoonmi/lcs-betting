import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { fetchTeams } from '../../actions/team_actions';
import { connect } from 'react-redux';
import TeamShow from './show';

class TeamIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.zoomIn = this.zoomIn.bind(this);
  }

  componentDidMount() {
    if (!this.props.fetchedTeams) {
      this.props.fetchTeams();
    }
  }

  // zoomIn(e) {
  //   e.currentTarget.backgroundSize = `90%`;
  //   // if (this.teamListItem) {
  //   //   this.teamListItem.backgroundSize = `90%`;
  //   // }
  // }

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

      const background = team.logoUrl;
      const style = { background: `url(${background})`, 
                      backgroundPositionY: `center`, 
                      backgroundRepeat: `no-repeat`, 
                      backgroundSize: `70%`,
                      position: `relative` };

      return (
        <li onHover={this.zoomIn} 
            className="team-list-item" 
            key={idx} 
            ref={el => (this.teamListItem = el)} 
            style={style}>
          <div className="team-gradient"></div>
          <NavLink to={`/teams/${team.acronym}`}>{team.acronym}</NavLink>
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