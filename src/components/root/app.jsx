import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import NavBar from '../nav/nav_bar';
import TeamIndex from '../teams/index';
import MatchIndex from '../matches/index';
import MatchShow from '../matches/show';
import Login from '../session/login';
import SignUp from '../session/signup';

import { fetchLCSData } from '../../actions/match_actions';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchLCSData();
  }

  render() {
    return (
      <>
      <NavBar/>
        <main>
          <Route path="/teams/:teamName?" component={TeamIndex} />
          <Switch>
            <Route path="/matches/week/:week/day/:day" component={MatchShow} />
            <Route path="/matches/" component={MatchIndex} />
          </Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route exact path="/" component={Dashboard}/>
        </main>
      </>
    );
  }
}

const mdp = dispatch => {
  return {
    fetchLCSData: () => dispatch(fetchLCSData())
  }
};

export default withRouter(connect(null, mdp)(App));