export const loggedin = (uid, email, role, token) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    uid: uid,
    email: email,
    role: role,
    token: token
  });
};

export const loggedout = () => dispatch => {
  dispatch({ type: "LOGGED_OUT" });
};

export const signup_success = (uid, email, role, token) => dispatch => {
  dispatch({
    type: "LOGGED_IN",
    uid: uid,
    email: email,
    role: role,
    token: token
  });
};