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
              </div>
              {predictions}
            </div>
        </div>

        );
    }
}

const msp = state => {
    return {
      user:state.session.currentUser
    };
};

const mdp = dispatch => {
    return {

    };
}

export default connect(msp, mdp)(Dashboard);
