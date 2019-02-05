import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../nav/nav_bar';
import TeamIndex from '../teams/index';
import MatchIndex from '../matches/index';
import Login from '../session/login';
import SignUp from '../session/signup';

export default function App() {
  return (
    <>
      <NavBar/>
      <main>
        <Route path="/teams/:teamName?" component={TeamIndex} />
        <Route path="/matches/:date?" component={MatchIndex} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
      </main>
    </>
  );
}