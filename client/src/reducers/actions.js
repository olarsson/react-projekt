export const changemsg = () => dispatch => {
  dispatch({ type: "LOGCHANGE" });
};

export const loggedin = () => dispatch => {
  dispatch({ type: "LOGGED_IN" });
};



/*
import axios from 'axios';

export const changemsg = () =>
async dispatch => {
    dispatch({ type: "LOGCHANGE" })
};*/
