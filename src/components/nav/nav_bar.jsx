import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutCurrentUser } from '../../actions/user_actions';

class NavBar extends React.Component {
  constructor(props) {
    super(props);                
  }
  
  render() {
    const { loggedIn, username, logout } = this.props;
    let logState;
    if (loggedIn) {
      logState = (
        <span className="logout" onClick={() => logout(username)}>Log Out</span>
      );
    } else {
      logState = (
        <Link to="/login">Log in</Link>
      );
    }                                                    
    return (
      <nav>
        <Link to="/"><h1>LCS</h1></Link>
        <ul>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
          <li>
            <Link to="/matches">Matches</Link>
          </li>
          <li>
            {logState}        
          </li>
        </ul>
      </nav>
    );
  }
}

const msp = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser,
  };
};

const mdp = dispatch => {
  return {
    logout: (username) => dispatch(logoutCurrentUser(username)),
  };
};


export default connect(msp, mdp)(NavBar);