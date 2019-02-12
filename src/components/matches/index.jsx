import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import ToggleButton from '../bets/toggle_button';
import SideNav from './side_nav';

const NAV_BAR_HEIGHT = 36;
const MATCH_LIST_PADDING = 5;

class MatchIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollRef: null
    };
    this.weekRefs = {};
    this.initialLoad = true;
  }

  render() {
    const { matches, teams, currentUser } = this.props;
    const weeks = matches.weeks || {};
    let scrollPositionSet;
    const { scrollRef } = this.state;
    const matchLis = Object.keys(weeks).sort().map((week, idx1) => {
      const days = Object.keys(matches.weeks[week].days);
      return (
        days.sort().map((day, idx2) => {
          const times = Object.keys(matches.weeks[week].days[day].matches);
          const dayOver = Date.parse(times[times.length - 1]) < Date.now() - (2 * 1000 * 60 * 60);
          if (!scrollPositionSet && !dayOver) {
            scrollPositionSet = { week, day };
          }
          const ref = (ref) => {
            if (ref){
              if (day == 1) {
                this.weekRefs[week] = ref;
              }
              if (!scrollRef && scrollPositionSet && scrollPositionSet.week == week && scrollPositionSet.day == day) {
                this.setState({
                  scrollRef: ref
                });
              }
            }
          };
          return (
            <li 
            key={idx2}
            ref={ref}>
              <Link to={`/matches/week/${week}/day/${day}`}>
                <h3>Week { week } Day { day }</h3>
              </Link>
              <ul>
                {times.sort().map((time, idx3) => {
                  const match = matches.weeks[week].days[day].matches[time];
                  const team1 = teams[match.team1Id];
                  const team2 = teams[match.team2Id];
                  const team1Name = team1.acronym;
                  const team2Name = team2.acronym;
                  return (
                    <li 
                      key={idx3}
                      style={(!match.winningTeamId || !currentUser.bets || !currentUser.bets[match.id]) ? {} : { borderColor: (match.winningTeamId == currentUser.bets[match.id]) ? "#2cce2c" : "#ff4949" }}
                      >
                      <span>{new Date(time).toLocaleTimeString([], { hour: '2-digit' })}</span>
                      <Link to={`/teams/${team1Name}`} >
                        <img 
                        style={{ opacity: (!match.winningTeamId || match.winningTeamId == team1.team) ? 1 : 0.3 }}
                        src={team1.logoUrl} />
                      </Link>
                      <div>
                        <div>
                          <Link 
                          style={{ 
                            color: TEAM_COLORS[team1Name].name,
                            opacity: (!match.winningTeamId || match.winningTeamId == team1.team) ? 1 : 0.3
                          }} 
                          to={`/teams/${team1Name}`} >
                            {team1Name}
                          </Link>
                          vs.
                          <Link style={{ 
                            color: TEAM_COLORS[team2Name].name,
                            opacity: (!match.winningTeamId || match.winningTeamId == team2.team) ? 1 : 0.3
                          }} to={`/teams/${team2Name}`} >
                            {team2Name}
                          </Link>
                        </div>
                        <ToggleButton match={match} />
                      </div>
                      <Link to={`/teams/${team2Name}`} >
                        <img 
                        style={{ opacity: (!match.winningTeamId || match.winningTeamId == team2.team) ? 1 : 0.3 }}
                        src={team2.logoUrl} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })
      );
    });
    if (this.initialLoad && scrollPositionSet && scrollRef) {
      window.scrollTo(0, scrollRef.offsetTop - NAV_BAR_HEIGHT - MATCH_LIST_PADDING);
      this.initialLoad = false;
    }
    return (
      <article className="match-index">
        {Object.keys(this.weekRefs).length != 0 ? <SideNav weekRefs={this.weekRefs}/> : null}
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
  const currentUser = state.users[state.session.currentUser] || {};
  return {
    matchDate: ownProps.match.params.date,
    matches: state.matches,
    teams: state.teams,
    currentUser,
  };
};

// const mdp = dispatch => {
//   return {
//     fetchMatches: () => dispatch(fetchMatches())
//   };
// };

export default withRouter(connect(msp, null)(MatchIndex));