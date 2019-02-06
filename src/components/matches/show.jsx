import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MatchShow extends React.Component {
  render() {
    const { week, day, matches } = this.props;
    return (
      <section className="match-show">
        <h2>Match Show for Week {week} Day {day}</h2>
        {matches ? matches[0].scheduledTime : null}
      </section>
    );
  }
}

const msp = (state, ownProps) => {
  const day = ownProps.match.params.day;
  const week = ownProps.match.params.week;
  let matches = null;
  try {
    matches = Object.values(state.matches.weeks[week].days[day].matches);
  } catch(err) {}
  return {
    week,
    day,
    matches
  };
};

export default withRouter(connect(msp, null)(MatchShow));