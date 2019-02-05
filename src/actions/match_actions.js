import firebase from '../firebase';

export const RECEIVE_MATCHES = 'RECEIVE_MATCHES';

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
