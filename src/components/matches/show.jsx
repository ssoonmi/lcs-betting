import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MatchShow extends React.Component {
  render() {
    const { matchDate } = this.props;
    return (
      <section className="match-show">
        <h2>Match Show for {matchDate}</h2>
      </section>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    matchDate: ownProps.match.params.date
  };
};

export default withRouter(connect(msp, null)(MatchShow));