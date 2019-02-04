import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/"><h1>LCS</h1></Link>
        <ul>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;