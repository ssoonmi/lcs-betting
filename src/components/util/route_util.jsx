import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const msp = state => {
  const currentUser = state.session.currentUser
  return {
    currentUser
  };
};

export const AuthRoute = withRouter(connect(msp, null)(
  function (props) {
    const {currentUser, path, component, location} = props;
    if (location.pathname == path) {
      if (currentUser) {
        return (<Redirect to="/" />);
      } else {
        return (<Route path={path} component={component} />);
      }
    } else {
      return (null);
    }
  }
));

export const ProtectedRoute = withRouter(connect(msp, null)(
  function (props) {
    const { currentUser, path, component, location } = props;
    if (location.pathname == path) {
      if (currentUser) {
        return (<Route path={path} component={component} />);
      } else {
        return (<Redirect to="/" />);
      }
    } else {
      return (null);
    }
  }
));