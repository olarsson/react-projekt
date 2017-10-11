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

export const bloglist = (blog_list) => dispatch => {
  //console.info("blog_list::::", blog_list)
  dispatch({
    type: "BLOGLIST",
    payload: blog_list
  });
};

export const listpostsandcomments = (list_all) => dispatch => {
  dispatch({
    type: "LISTPOSTSANDCOMMENTS",
    payload: list_all
    // list_all: list_all
  });
};