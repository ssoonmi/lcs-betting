import firebase from '../firebase';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const REMOVE_CURRENT_USER= "REMOVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS= "RECEIVE_SESSION_ERRORS";

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
      const users = snapshot.val();
      if (users[user.username]) {
        const checkUser = users[user.username];
        if (checkUser.password == user.password) {
          dispatch(receiveCurrentUser(snapshot.val()[user.username]));
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
  const userRef = firebase.database().ref("users/");
  userRef.once('value', (snapshot) => {
    const users = snapshot.val();
    if (users && users[user.username]) {
      dispatch(receiveSessionErrors(['User Already Exists']));
    } else {
      userRef.set({ [user.username]: user });
      dispatch(receiveCurrentUser(user));
    }
  }, (error) => {
    console.log("Error: " + error.code);
  });
};