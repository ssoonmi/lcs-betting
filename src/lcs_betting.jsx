import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root/root';
import configureStore from './store/store';

import { fetchLCSData } from './actions/match_actions';
import { makeBet } from './actions/bet_actions';

function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const currentUser = getCookie("currentUser");
  let preloadedState = {
    ui: { loading: true }
  };
  if (currentUser) {
    preloadedState.session = {currentUser};
  }
  const store = configureStore(preloadedState);
  window.store = store;
  window.fetchLCSData = fetchLCSData;
  window.makeBet = makeBet;
  ReactDOM.render(<Root store={store}/>, root);
});

window.TEAM_COLORS = {
  TL: {
    main: "hsl(213, 76%, 25%)",
    second: "hsl(213, 76%, 65%)",
    text: "#ffffff",
    name: "hsl(213, 76%, 65%)",
  },
  TSM: {
    main: "hsl(0, 0%, 35%)",
    second: "hsl(0, 0%, 0%)",
    text: "#ffffff",
    name: "hsl(0, 0%, 80%)",
  },
  OPT: {
    main: "hsl(81, 46%, 57%)",
    second: "hsl(81, 46%, 17%)",
    text: "#06080d",
    name: "hsl(81, 46%, 57%)",
  },
  GGS: {
    main: "hsl(215, 100%, 29%)",
    second: "hsl(215, 100%, 69%)",
    text: "#f3c35f",
    name: "#f3c35f",
  },
  FLY: {
    main: "hsl(38, 56%, 56%)",
    second: "hsl(38, 56%, 16%)",
    text: "#30522e",
    name: "hsl(38, 56%, 56%)",
  },
  CG: {
    main: "hsl(0, 0%, 20%)",
    second: "hsl(1, 58%, 14%)",
    text: "hsl(1, 58%, 54%)",
    name: "hsl(1, 58%, 54%)",
  },
  FOX: {
    main: "hsl(33, 80%, 64%)",
    second: "hsl(33, 80%, 24%)",
    text: "#ffffff",
    name: "hsl(33, 80%, 64%)",
  },
  C9: {
    main: "hsl(203, 76%, 63%)",
    second: "hsl(203, 76%, 23%)",
    text: "#ffffff",
    name: "hsl(203, 76%, 63%)",
  },
  100: {
    main: "hsl(2, 68%, 56%)",
    second: "hsl(2, 68%, 16%)",
    text: "#000000",
    name: "hsl(2, 68%, 56%)",
  },
  CLG: {
    main: "hsl(0, 0%, 40%)",
    second: "hsl(0, 0%, 80%)",
    text: "#5fb3dc",
    name: "#5fb3dc",
  },
};