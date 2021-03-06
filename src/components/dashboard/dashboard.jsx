import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let standings;
      let predictions;
      let recentMatches = [];
      let upcomingMatches = [];
      let showRecent;
      let showUpcoming;
      let currentUser = this.props.user;
      if (this.props.matches) {
        for (let i = 0; i < this.props.matches.length; i++) {
          let match = this.props.matches[i];
          if (match.resolved === "resolved") {
            recentMatches.push(match);
          } else {
            upcomingMatches.push(match);
          }
        }
        showRecent = recentMatches.reverse().slice(0,3).map(match => {
          let team1Name = this.props.teams[match.team1].acronym;
          let team2Name = this.props.teams[match.team2].acronym;
          return (
          <li key={match.name}>
            <div> <Link to={`/teams/${team1Name}`}> {team1Name}</Link> vs <Link to={`/teams/${team2Name}`}> {team2Name}</Link> </div>
          </li>
          );
        });
        showUpcoming = upcomingMatches.slice(0,3).map(match => {
          let team1Name = this.props.teams[match.team1].acronym;
          let team2Name = this.props.teams[match.team2].acronym;
          return (
          <li key={match.name}>
            <div> <Link to={`/teams/${team1Name}`}> {team1Name}</Link> vs <Link to={`/teams/${team2Name}`}> {team2Name}</Link> </div>
          </li>
          );
        });
      }
      if (this.props.user) {
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
          <Link to="/matches" className="match-btn"> Make Your Predictions </Link>
        );
      }
        return (
          <div className="dashboard">
            <div className="match-history-container">
              <div className="match-history">
                <span> Recent Matches </span>
                <hr className="line-brk"/>
                <ul className="match-link">
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
                  <ul className="match-link">
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
    let matches = [];
    let timestamps;
    if (state.matches.timestamps) {
      timestamps = Object.keys(state.matches.timestamps);
      for (let i = 0; i < timestamps.length; i++) {
        let match = timestamps[i];
        matches.push(match);
      }

      matches = matches.sort(function(a,b) {
        let match1 = new Date(a);
        let match2 = new Date(b);
        return match1 > match2 ? 1 : match1 < match2 ?  -1 : 0;
      });
      matches = matches.map(match => state.matches.timestamps[match]);
    }

    return {
      user:state.session.currentUser,
      matches: matches,
      teams: state.teams,
    };
};

const mdp = dispatch => {
    return {

    };
}

export default connect(msp, mdp)(Dashboard);
