import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TeamShow extends React.Component {
  render() {
    const { team } = this.props;
    return (
      <section className="team-show">
        <div>
          <h2>{team.name}</h2>
        </div>
      </section>
    );
  }
}

const msp = (state, ownProps) => {
  const teamId = ownProps.teamId;
  const team = state.teams[teamId] || {};
  return {
    team
  };
}

export default withRouter(connect(msp, null)(TeamShow));