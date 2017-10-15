export const loggedin = (payload) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    payload: payload
  });
};

export const loggedout = () => dispatch => {
  dispatch({
    type: "LOGGED_OUT"
  });
};

export const signup_success = (payload) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    payload: payload
  });
};

export const topiclist = (payload) => dispatch => {
  dispatch({
    type: "TOPICLIST",
    payload: payload
  });
};

export const boardlist = (payload) => dispatch => {
  dispatch({
    type: "TOPICSANDCOMMENTSLIST",
    payload: payload
  });
};