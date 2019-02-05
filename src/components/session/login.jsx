import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/user_actions';

const msp = state => {
  return {
    formType: 'login'
  };
}

const mdp = dispatch => {
  return {
    formSubmit: (user) => dispatch(login(user)),
  };
}

export default connect(msp, mdp)(SessionForm);