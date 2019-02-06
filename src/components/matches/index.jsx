import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Link } from 'react-router-dom';
// import { fetchMatches } from '../../actions/match_actions';

class MatchIndex extends React.Component {

  render() {
    const { matches, matchDate, teams } = this.props;
    const weeks = matches.weeks || {};
    const matchLis = Object.keys(weeks).sort().map((week, idx1) => {
      const days = Object.keys(matches.weeks[week].days);
      return (
        days.sort().map((day, idx2) => {
          const times = Object.keys(matches.weeks[week].days[day].matches);
          return (
            <li key={idx2}>
              <Link to={`/matches/week/${week}/day/${day}`}>
                <h3>Week { week } Day { day }</h3>
              </Link>
              <ul>
                {times.sort().map((time, idx3) => {
                  const match = matches.weeks[week].days[day].matches[time];
                  const team1 = teams[match.team1Id].acronym;
                  const team2 = teams[match.team2Id].acronym;
                  return (
                    <li key={idx3}>
                      {new Date(time).toLocaleTimeString()}
                      <div>
                        <Link to={`/teams/${team1}`} >{team1}</Link>
                          vs.
                        <Link to={`/teams/${team2}`} >{team2}</Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })
      );
    });
    return (
      <article className="match-index">
        <section className="match-index-list">
          <ul>
            {matchLis}
          </ul>
        </section>
      </article>
    )
  }
}

const msp = (state, ownProps) => {
  return {
    matchDate: ownProps.match.params.date,
    matches: state.matches,
    teams: state.teams
  };
};

// const mdp = dispatch => {
//   return {
//     fetchMatches: () => dispatch(fetchMatches())
//   };
// };

export default withRouter(connect(msp, null)(MatchIndex));