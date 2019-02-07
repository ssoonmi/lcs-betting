import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root/root';
import configureStore from './store/store';

import { fetchLCSData } from './actions/match_actions';
import { makeBet } from './actions/bet_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  window.store = store;
  window.fetchLCSData = fetchLCSData;
  window.makeBet = makeBet;
  ReactDOM.render(<Root store={store}/>, root);
});