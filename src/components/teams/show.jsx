import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class TeamShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {teamLoading: this.props.teamLoading};
    this.fadeIn = this.fadeIn.bind(this);
  }

  componentDidMount() {
    if (this.teamShow) {
      debugger
      this.teamShow.style.opacity = 1;
    }
  }

  fadeIn() {
    this.teamShow.style.opacity = 1;
  }


  render() {
    if (!this.props.teamLoading) {
      const { team } = this.props;
      const roles = {midlane: "Mid Lane", 
                     toplane: "Top Lane", 
                     jungle: "Jungle",
                     support: "Support",
                     adcarry: "Bot Lane"};
      const socialMedia = {twitter: "Twitter",
                           facebook: "Facebook",
                           twitch: "Twitch",
                           youtube: "YouTube",
                           instagram: "Instagram",
                           azubu: "Azubu"};

      const starters = {};
      
      team.starters.forEach((player) => {
        starters[player] = player;
      })
      let playerOrder = 0

      const players = team.players.map((player, idx) => {
        const { socialNetworks } = player;
        const socials = [];
        let i = 0;
        
        if (starters[player.id]) {
          for (const platform in socialNetworks) {
            let url;
            if (socialNetworks[platform].slice(0,8) !== "https://") {
              url = "https://" + socialNetworks[platform];
            } else {
              url = socialNetworks[platform];
            }

            socials.push(<li key={player.id + i}>
              <a href={url}>{socialMedia[platform]}</a>
            </li>)

            socials.push(
              <li key={player.id + player.name.length + i}> | </li>
            )
            i+=1;
          }
          playerOrder += 1;

          socials.pop();

          return <li key={idx} className="player-list-item" id={`player` + playerOrder}>
            <h1>{player.name}</h1>
            <img src={player.photoUrl}/>
            <h3>{player.firstName} {player.lastName}</h3>
            <h3 className="player-role">{roles[player.roleSlug]}</h3>
            <ul>{socials}</ul>
          </li>
        }
      })

      return (
        <section className="team-show" id="team-show"
                 ref={el => (this.teamShow = el)}>
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