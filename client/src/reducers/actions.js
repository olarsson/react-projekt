//import axios from 'axios';

export const changemsg = () => dispatch => {
  dispatch({ type: "LOGCHANGE" });
};

export const loggedin = (uid, email, password, role, token) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    uid: uid,
    email: email,
    password: password,
    role: role,
    token: token
  });
};

export const loggedout = () => dispatch => {
  dispatch({ type: "LOGGED_OUT" });
};

export const signup_success = (uid, email, password, role, token) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    uid: uid,
    email: email,
    password: password,
    role: role,
    token: token
  });
};



/*
import axios from 'axios';

export const changemsg = () =>
async dispatch => {
    dispatch({ type: "LOGCHANGE" })
};*/
