import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import StakeForm from './stake_form';
import TeamSelect from './team_select';
import ShowHeader from './show_header';

class MatchShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStakeForm: false
    };
  }

  hideStakeForm() {
    this.setState({showStakeForm: false});
  }

  showStakeForm() {
    this.setState({showStakeForm: true});
  }

  render() {
    const { week, day, matches, loading, users, teams, stake } = this.props;
    const betsWon = {max: 1};

    if (matches) {
      const table = (
        <table className="bet-table">
          <tbody>
            <tr>
              <th>Match</th>
              {users.map((user, idx) => (
                <th key={idx}>{user.username}</th>
              ))}
            </tr>
            {matches.map((match, idx) => {
              const team1 = teams[match.team1Id];
              const team2 = teams[match.team2Id];
              const team1Name = team1.acronym;
              const team2Name = team2.acronym;
              return (
                <tr key={idx}>
                  <td className="match-info">
                    <Link to={`/teams/${team1Name}`} >
                      <img
                        style={{ opacity: (!match.winningTeamId || match.winningTeamId == team1.team) ? 1 : 0.2 }}
                        src={team1.logoUrl} />
                    </Link>
                    <div>
                      <Link
                        style={{
                          color: TEAM_COLORS[team1Name].name,
                          opacity: (!match.winningTeamId || match.winningTeamId == team1.team) ? 1 : 0.2
                        }}
                        to={`/teams/${team1Name}`} >
                        <span>{team1Name}</span>
                      </Link>
                      vs.
                        <Link style={{
                        color: TEAM_COLORS[team2Name].name,
                        opacity: (!match.winningTeamId || match.winningTeamId == team2.team) ? 1 : 0.2
                      }} to={`/teams/${team2Name}`} >
                        <span>{team2Name}</span>
                      </Link>
                    </div>
                    <Link to={`/teams/${team2Name}`} >
                      <img
                        style={{ opacity: (!match.winningTeamId || match.winningTeamId == team2.team) ? 1 : 0.2 }}
                        src={team2.logoUrl} />
                    </Link>
                  </td>
                  {users.map((user, idx) => {
                    const bets = user.bets || {};
                    const team = teams[bets[match.id]] || {};
                    betsWon[user.username] = betsWon[user.username] || 0;
                    betsWon[user.username] += (match.winningTeamId && match.winningTeamId == team.team) ? 1 : 0;
                    if (betsWon[user.username] > betsWon.max) betsWon.max = betsWon[user.username];
                    return (
                      <td key={idx} className="user-bet">
                        <div>
                          <TeamSelect team={team} match={match} username={user.username}/>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <td className="user-bet-total-header">Total Predictions Correct:</td>
              {users.map((user, idx) => {
                const userBetsWon = betsWon[user.username] || 0;
                return (
                  <td key={idx}>
                    <div className="user-bet-total">{userBetsWon}</div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      );
      let winners;
      if (matches[matches.length - 1].state == "resolved") {
        const maxBet = betsWon.max;
        users.forEach((user) => {
          const bet = betsWon[user.username];
          if (bet < maxBet) {
            delete betsWon[user.username];
          }
        });
        delete betsWon.max;

        winners = Object.keys(betsWon).join(", ")
      }
      
      return (
        <section className="match-show">
          <ShowHeader week={week} day={day}/>
          {table}
          {winners ? 
          (<div className="bet-winners">
            {winners.length > 0 ?
              (<>
                <span>
                  Winner(s):
                </span>
                {winners}
              </>)
              : (<span>No Winner :(</span>)}
          </div>) : (null)}
          <div className="day-stake">
            <span>Stake: </span>
            {!stake || this.state.showStakeForm ? (
              <StakeForm
                showModal={this.state.showStakeForm}
                hideStakeForm={this.hideStakeForm.bind(this)}
                week={week}
                day={day} />
            ) : (
              <div 
              style={{ cursor: "pointer" }}
              onClick={this.showStakeForm.bind(this)}>{stake}</div>
            )}
          </div>
          
        </section>
      );
    } else if (loading) {
      return (
        <section className="match-show">
          <h2>Week {week} Day {day}</h2>
        </section>
      );
    } else {
      return (
        <Redirect to="/matches" />
      );
    }
    
  }
}

const msp = (state, ownProps) => {
  const day = ownProps.match.params.day;
  const week = ownProps.match.params.week;
  let matches = null;
  let stake;
  try {
    matches = Object.values(state.matches.weeks[week].days[day].matches);
    stake = state.matches.weeks[week].days[day].stake;
  } catch(err) {}
  return {
    week,
    day,
    matches,
    teams: state.teams,
    users: Object.values(state.users),
    loading: state.ui.loading,
    stake
  };
};

export default withRouter(connect(msp, null)(MatchShow));