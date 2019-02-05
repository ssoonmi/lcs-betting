import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TeamShow extends React.Component {
  render() {
    const { team } = this.props;
    return (
      <section className="team-show">
        <h2>{team.name}</h2>
      </section>
    );
  }
}

const msp = (state, ownProps) => {
  const teamName = ownProps.match.params.teamName;
  const team = state.teams[teamName] || {};
  return {
    team
  };
}

export default withRouter(connect(msp, null)(TeamShow));