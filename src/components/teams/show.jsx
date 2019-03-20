import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPlayers } from '../../actions/team_actions';

class TeamShow extends React.Component {
  render() {
    if (!this.props.teamLoading) {
      const { team } = this.props;
      const roles = {midlane: "Mid Lane", 
                     toplane: "Top Lane", 
                     jungle: "Jungle",
                     support: "Support",
                     adcarry: "Bot Lane"}

      const players = team.players.map((player, idx) => {
        const socials = [];
        for (const platform in socialNetworks) {
          socials.push(<li>
            <a href={socialNetworks.platform}>{platform[0].toUppercase + platform.slice(1)}</a>
          </li>)
        };

        return <li key={idx} className="player-list-item">
          <h1>{player.name}</h1>
          <img src={player.photoUrl}/>
          <h3>{player.firstName} {player.lastName}</h3>
          <h3 className="player-role">{roles[player.roleSlug]}</h3>
          <ul>{socials}</ul>
        </li>
      })

      return (
        <section className="team-show">
          <div>
            <header className="team-show-header">
              <img className="team-logo" src={team.logoUrl}/>
              <h2>{team.name}</h2>
            </header>
            <section className="team-show-roster">
              <ul>
                {players}
              </ul>
            </section>
          </div>
        </section>
      );
    } else {
      return (
        <div className="team-loading-gif">
          <img src="https://glidewear.com/wp-content/plugins/layerednavigation-master/assets/images/Layered-Navigation-Loading.gif" />
        </div>
      );
    }
  }
}

const msp = (state, ownProps) => {
  const teamId = ownProps.teamId;
  const team = state.teams[teamId] || {};
  return {
    team,
    teamLoading: state.ui.teamLoading
  };
}

export default withRouter(connect(msp, null)(TeamShow));