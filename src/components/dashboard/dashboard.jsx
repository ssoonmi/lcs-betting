import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.props;
    }

    render() {
      let standings;
      let predictions;
      let recentMatches = [];
      let upcomingMatches = [];
      let showRecent;
      let showUpcoming;
      if (this.props.matches) {
        this.props.matches.forEach(match => {
          if (match.state === "resolved") {
            recentMatches.push(match);
          } else {
            upcomingMatches.push(match);
          }
        });
        showRecent = recentMatches.reverse().slice(0,3).map(match => (
          <li>
            <div> {match.name} </div>
          </li>
        ));
        showUpcoming = upcomingMatches.slice(0,3).map(match => (
          <li>
            <div> {match.name} </div>
          </li>
        ));
      }
      if (this.state.user) {
        standings = (
          <div className="standings">
            <span>Current Standings</span>
            <ul>
              <li>Brian</li>
              <li>Soon-Mi</li>
              <li>Aaron</li>
            </ul>
          </div>
        );
        predictions = (
          <span className="match-btn"> Make Your Predictions </span>
        );
      }
        return (
          <div className="dashboard">
            <div className="match-history-container">
              <div className="match-history">
                <span> Recent Matches </span>
                <hr className="line-brk"/>
                <ul>
                  {showRecent}
                </ul>
              </div>
              <span className="match-btn"> Previous Bets </span>
            </div>
            <div className="twitch-container">
              <span>
                TUNE INTO THE LCS LIVESTREAM
              </span>
              <iframe
                src="https://player.twitch.tv/?channel=RiotGames"
                className="twitch-embed"
                height="300"
                width="500"
                frameBorder="false"
                scrolling="no"
                allowFullScreen={true}>
              </iframe>
              {standings}
          </div>
            <div className="match-history-container">
              <div className="match-history">
                <span> Upcoming Matches </span>
                  <hr className="line-brk"/>
                  <ul>
                    {showUpcoming}
                  </ul>
              </div>
              {predictions}
            </div>
        </div>

        );
    }
}

const msp = state => {
    let matches;
    if (state.matches == true) {
      matches = Object.values(state.matches.timestamps);
    }
    return {
      user:state.session.currentUser,
      matches: matches,
    };
};

const mdp = dispatch => {
    return {

    };
}

export default connect(msp, mdp)(Dashboard);
