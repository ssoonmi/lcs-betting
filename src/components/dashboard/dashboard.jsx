import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    render() {
        return (
          <div className="dashboard">
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
          </div>
        </div>

        );
    }
}

const msp = state => {
    return {

    };
};

const mdp = dispatch => {
    return {

    };
}

export default connect(msp, mdp)(Dashboard);
