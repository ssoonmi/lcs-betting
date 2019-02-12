import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TeamShow extends React.Component {
  render() {
    if (!this.props.teamLoading) {
      const { team } = this.props;
      return (
        <section className="team-show">
          <div>
            <h2>{team.name}</h2>
          </div>
        </section>
      );
    } else {
      return (
        <div className="team-loading-gif">
          <img src="https://glidewear.com/wp-content/plugins/layerednavigation-master/assets/images/Layered-Navigation-Loading.gif" />
        </div>
      );
    }
  }
}

const msp = (state, ownProps) => {
  const teamId = ownProps.teamId;
  const team = state.teams[teamId] || {};
  return {
    team,
    teamLoading: state.ui.teamLoading
  };
}

export default withRouter(connect(msp, null)(TeamShow));