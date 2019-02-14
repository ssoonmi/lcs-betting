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

import { AuthRoute, ProtectedRoute } from '../util/route_util';

import { fetchLCSData } from '../../actions/match_actions';
import { fetchUsers } from '../../actions/user_actions';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchLCSData();
    this.props.fetchUsers();
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loading-gif" >
          <img src="https://unixtitan.net/images/loading-vector-gif-4.gif"/>
        </div>
      )
    } else {
      return (
        <>
          <NavBar />
          <main>
            <Route path="/teams/:teamName?" component={TeamIndex} />
            <Switch>
              <Route path="/matches/week/:week/day/:day" component={MatchShow} />
              <Route path="/matches/" component={MatchIndex} />
            </Switch>
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/signup" component={SignUp} />
            <Route exact path="/" component={Dashboard} />
          </main>
        </>
      );
    }
  }
}

const msp = state => {
  return {
    loading: state.ui.loading
  };
}

const mdp = dispatch => {
  return {
    fetchLCSData: () => dispatch(fetchLCSData()),
    fetchUsers: () => dispatch(fetchUsers()),
  }
};

export default withRouter(connect(msp, mdp)(App));