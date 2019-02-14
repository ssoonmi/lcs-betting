import firebase from '../firebase';

export const RECEIVE_STAKES = "RECEIVE_STAKES";

export const makeBet = (matchId, teamId, username) => dispatch => {
  const userMatchBetRef = firebase.database().ref(`/users/users/${username}/bets/${matchId}`);
  userMatchBetRef.set(teamId);
};

export const makeStake = (week, day, stake) => dispatch => {
  const stakeRef = firebase.database().ref(`/stakes/week/${week}/day/${day}`);
  stakeRef.set(stake);
};

const receiveStakes = (stakes) => {
  return {
    type: RECEIVE_STAKES,
    stakes
  }
}

export const fetchStakes = () => dispatch => {
  const stakesRef = firebase.database().ref('stakes');
  stakesRef.on('value', (snapshot) => {
    dispatch(receiveStakes(snapshot.val()));
  }, (error) => {
    console.log("Error: " + error.code);
  });
};
