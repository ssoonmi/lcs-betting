import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { fetchMatches } from '../../actions/match_actions';
import MatchShow from './show.jsx';

class MatchIndex extends React.Component {
  componentDidMount() {
    this.props.fetchMatches();
  }

  render() {
    const { matches, matchDates, matchDate } = this.props;
    const matchLis = matches.map((matchDay, idx1) => {
      return (
        <li key={idx1}>
          <NavLink to={`/matches/${matchDates[idx1]}`}>Day: {matchDates[idx1]}</NavLink>
          <ul>
            {Object.values(matchDay).map((match, idx2) => {
              return (
                <li key={idx2}>
                  {match.team1} vs. {match.team2}
                </li>
              );
            })}
          </ul>
        </li>
      );   
    });
    return (
      <article className="match-index">
        <section className="match-index-list">
          <ul>
            {matchLis}
          </ul>
        </section>
        {matchDate ? <MatchShow/> : null}
      </article>
    )
  }
}

const msp = (state, ownProps) => {
  return {
    matchDate: ownProps.match.params.date,
    matchDates: Object.keys(state.matches),
    matches: Object.values(state.matches)
  };
}

const mdp = dispatch => {
  return {
    fetchMatches: () => dispatch(fetchMatches())
  };
}

export default withRouter(connect(msp, mdp)(MatchIndex));