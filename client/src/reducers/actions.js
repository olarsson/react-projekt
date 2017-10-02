export const changemsg = () => dispatch => {
  dispatch({ type: "LOGCHANGE" });
};

export const loggedin = (uid, email) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    uid: uid,
    email: email
  });
};



/*
import axios from 'axios';

export const changemsg = () =>
async dispatch => {
    dispatch({ type: "LOGCHANGE" })
};*/
