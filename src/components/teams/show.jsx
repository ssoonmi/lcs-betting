import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';


class TeamShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {teamLoading: this.props.teamLoading};
    this.starters = {};
    this.buildPlayers = this.buildPlayers.bind(this);
    this.playerStats = this.playerStats.bind(this);
  }

  componentDidMount() {
    if (this.teamShow) {
      this.teamShow.style.opacity = 1;
    }
  }

  buildPlayers() {
    const { team } = this.props;
    const roles = {midlane: "Mid Lane", 
                  toplane: "Top Lane", 
                  jungle: "Jungle",
                  support: "Support",
                  adcarry: "Bot Lane"};
    const socialMedia = {twitter: <i class="fab fa-twitter"></i>,
                        facebook: <i class="fab fa-facebook"></i>,
                        twitch: <i class="fab fa-twitch"></i>,
                        youtube: <i class="fab fa-youtube"></i>,
                        instagram: <i class="fab fa-instagram"></i>};

    this.starters = {};

    team.starters.forEach((player) => {
      this.starters[player] = player;
    });

    let playerOrder = 0;

    const players = team.players.map((player, idx) => {
      const { socialNetworks } = player;
      const socials = [];
      let i = 0;
      
      if (this.starters[player.id]) {
        for (const platform in socialNetworks) {
          let url;
          if (socialNetworks[platform].slice(0,8) !== "https://") {
            url = "https://" + socialNetworks[platform];
          } else {
            url = socialNetworks[platform];
          }

          if (socialMedia[platform]) {
            socials.push(<li key={player.id + i}>
              <Link className='social-link' to={url}>{socialMedia[platform]}</Link>
            </li>)
  
            socials.push(
              <li key={player.id + player.name.length + i}> | </li>
            )
            i+=1;
          }
        }
        playerOrder += 1;

        socials.pop();
        
        const playerStats = this.playerStats(player.id);

        return <li key={idx} className='player-list-item' id={`player` + playerOrder}>
          <h1>{player.name}</h1>
          <img src={player.photoUrl}/>
          <h3>{player.firstName} {player.lastName}</h3>
          <h3 className='player-role'>{roles[player.roleSlug]}</h3>
          <ul className='player-socials'>{socials ? socials : <li className='empty-socials'> </li>}</ul>
          {playerStats}
        </li>
      }
    })
    return players;
  }

  playerStats(playerId) {
    const { team } = this.props;

    for (let i = 0; i < team.teamRosterStats.length; i += 1) {
      const stat = team.teamRosterStats[i];

      if (stat.playerId.slice(39) === playerId.toString()) {
        return (
          <ul className='player-stats'>
            <li>{stat.averageKills.toFixed(3)}</li>
            <li>{stat.averageAssists.toFixed(3)}</li>
            <li>{stat.averageDeaths.toFixed(3)}</li>
            <li>{stat.averageKillParticipation.toFixed(3)}</li>
          </ul>
        )
      }
    }

  }

  render() {
    if (!this.props.teamLoading) {
      const { team } = this.props;
      const players = this.buildPlayers();

      return (
        <section className="team-show" id="team-show"
                 ref={el => (this.teamShow = el)}>
          <div>
            <header className="team-show-header">
              <h2>{team.name}</h2>
            </header>
            <section className="team-show-roster">
              <ul>
                <li className="logo-stats">
                  <img className="team-logo" src={team.logoUrl}/>
                  <ul>
                    <li>Average Kills</li>
                    <li>Average Assists</li>
                    <li>Average Deaths</li>
                    <li>Average Kill Participation</li>
                  </ul>
                </li>
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