import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/user_actions';

const msp = state => {
  return {
    formType: 'signup'
  };
}

const mdp = dispatch => {
  return {
    formSubmit: (user) => dispatch(signup(user)),
  };
}

export default connect(msp, mdp)(SessionForm);