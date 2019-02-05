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
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    const isLogin = this.props.formType == 'login';
    return (
      <article>
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
        <form onSubmit={this.handleSubmit()}>
          <label>
            Username: 
            <input type="text" value={this.state.username} onChange={this.updateField("username")}/>
          </label>
          <label>
            Password: 
            <input type="password" value={this.state.password} onChange={this.updateField("password")} />
          </label>
          <input type="submit" value={isLogin ? "Log In" : "Sign Up"}/>
        </form>
        {isLogin ? 
          <Link to="/signup">Don't have an account? Sign Up</Link> : <Link to="/login">Already a user? Log In</Link>
        }
      </article>
    );
  }
}

export default SessionForm;