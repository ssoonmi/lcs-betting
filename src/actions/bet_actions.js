import firebase from '../firebase';

export const makeBet = (matchId, teamId, username) => dispatch => {
  const userMatchBetRef = firebase.database().ref(`/users/users/${username}/bets/${matchId}`);
  userMatchBetRef.set(teamId);
};
