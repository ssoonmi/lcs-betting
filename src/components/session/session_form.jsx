import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit() {
    return (e) => {
      e.preventDefault();
      this.props.formSubmit(this.state);
    };
  }

  updateField(field) {
    if (this.sessionSubmit){
      if (this.state.username.length > 0 && this.state.password.length > 0) {
        this.sessionSubmit.disabled = false;
      } else {
        this.sessionSubmit.disabled = true;
      }
    }
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    const isLogin = this.props.formType == 'login';
    return (
      <div className="session-screen">
        <article className="session-form-container">
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
          <form onSubmit={this.handleSubmit()} className="session-form">
            <label htmlFor="username">
              Username:
              <input id="username" type="text" value={this.state.username} onChange={this.updateField("username")} className="session-form-info"/>
            </label>
            <label htmlFor="password">
              Password:
              <input id="password" type="password" value={this.state.password} onChange={this.updateField("password")} className="session-form-info"/>
            </label>
            <input type="submit" value={isLogin ? "Log In" : "Sign Up"} ref={elem => this.sessionSubmit = elem} className="session-form-submit" disabled/>
          </form>
          {isLogin ?
            <Link to="/signup">Don't have an account? Sign Up</Link> : <Link to="/login">Already a user? Log In</Link>
          }
        </article>
      </div>
    );
  }
}

export default SessionForm;
