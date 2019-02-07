import firebase from '../firebase';

export const RECEIVE_MATCHES = 'RECEIVE_MATCHES';
export const RECEIVE_LCS_DATA = 'RECEIVE_LCS_DATA';

export const receiveMatches = (matches) => {
  return {
    type: RECEIVE_MATCHES,
    matches
  }
};

export const fetchMatches = () => dispatch => {
  const matchesRef = firebase.database().ref("matches/");
  matchesRef.on('value', (snapshot) => {
    dispatch(receiveMatches(snapshot.val()));
  }, (error) => {
    console.log("Error: " + error.code);
  });
};

export const fetchLCSData = () => dispatch => {
  function receiveLCSData() {
    const data = JSON.parse(this.responseText);
    const lcs = data.highlanderTournaments[6];
    const gameIds = lcs.gameIds; //array
    const matches = Object.values(Object.values(lcs.brackets)[0].matches); //array
    const allMatches = data.scheduleItems;
    const teams = Object.values(lcs.rosters); //array
    const allTeams = data.teams; // array

    dispatch({
      type: RECEIVE_LCS_DATA,
      data,
      lcs,
      gameIds,
      matches,
      allMatches,
      teams,
      allTeams
    });
  }

  const oReq = new XMLHttpRequest();
  oReq.onload = receiveLCSData; // same as: oReq.addEventListener("load", receiveLCSData);
  oReq.open("GET", "https://api.lolesports.com/api/v1/scheduleItems?leagueId=2");
  oReq.send();
};

export const fetchMatchDetails = (tournamentId, matchId) => dispatch => {
  function receiveMatchDetails() {
    const details = JSON.parse(this.responseText);
    dispatch({
      type: RECEIVE_MATCH_DETAILS,
      details
    });
  }

  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', receiveMatchDetails);
  oReq.open(
    "GET",
    `https://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=${tournamentId}&matchId=${matchId}`
    );
  oReq.send();
}
