import firebase from '../firebase';

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';

export const receiveTeams = (teams) => {
  return {
    type: RECEIVE_TEAMS,
    teams
  }
};

export const fetchTeams = () => dispatch => {
  const teamsRef = firebase.database().ref("teams/");
  teamsRef.on('value', (snapshot) => {
    dispatch(receiveTeams(snapshot.val()));
  }, (error) => {
    console.log("Error: " + error.code);
  });
};
