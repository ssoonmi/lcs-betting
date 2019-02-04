import React from 'react';
import { Route } from 'react-router-dom';
import TeamIndex from '../teams/index';
import NavBar from '../nav/nav_bar';

export default function App() {
  return (
    <>
      <NavBar/>
      <main>
        <Route path="/teams" component={TeamIndex} />
      </main>
    </>
  );
}