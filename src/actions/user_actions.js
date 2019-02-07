import firebase from '../firebase';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const REMOVE_CURRENT_USER= "REMOVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS= "RECEIVE_SESSION_ERRORS";

export const fetchUsers = () => dispatch => {
  const usersRef = firebase.database().ref('users/users');
  usersRef.on('value', (snapshot) => {
    dispatch(receiveUsers(snapshot.val()));
  }, (error) => {
    console.log("Error: " + error.code);
  });
};

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  }
};

export const receiveCurrentUser = (user) => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    };
};

export const logoutCurrentUser = (username) => {
    return {
        type: REMOVE_CURRENT_USER,
        username
    };
};

export const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

export const login = (user) => dispatch => {
    const userRef = firebase.database().ref("users/");
    userRef.once('value', (snapshot) => {
      const userInfo = snapshot.val();
      const passwords = userInfo.passwords;
      const users = userInfo.users;
      if (users[user.username]) {
        if (passwords[user.username] == user.password) {
          dispatch(receiveCurrentUser({ username: user.username }));
        } else {
          dispatch(receiveSessionErrors(['Invalid Password']));
        }
      } else {
        dispatch(receiveSessionErrors(['User Not Found']));
      }
    }, (error) => {
      console.log("Error: " + error.code);
    });
};

export const signup = (user) => dispatch => {
  const usersRef = firebase.database().ref("users/");
  usersRef.once('value', (snapshot) => {
    const users = snapshot.val();
    if (users && users[user.username]) {
      dispatch(receiveSessionErrors(['User Already Exists']));
    } else {
      const passwordUserRef = firebase.database().ref(`/users/passwords/${user.username}`);
      passwordUserRef.set(user.password);
      const userRef = firebase.database().ref(`users/users/${user.username}/username`);
      userRef.set(user.username);
      dispatch(receiveCurrentUser({ username: user.username }));
    }
  }, (error) => {
    console.log("Error: " + error.code);
  });
};