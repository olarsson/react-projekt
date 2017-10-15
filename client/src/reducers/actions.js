export const loggedin = (payload) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    payload: payload
  });
};

export const loggedout = () => dispatch => {
  dispatch({ type: "LOGGED_OUT" });
};

export const signup_success = (payload) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    payload: payload
  });
};

export const topiclist = (topic_list) => dispatch => {
  dispatch({
    type: "TOPICLIST",
    payload: topic_list
  });
};

export const boardlist = (list_all) => dispatch => {
  dispatch({
    type: "TOPICSANDCOMMENTSLIST",
    payload: list_all
  });
};