const auth = (
  state = {
    logged_in: false
  },
  action
) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        uid: action.uid,
        email: action.email,
        role: action.role,
        token: action.token,
        logged_in: true
      };
    case "LOGGED_OUT":
      return {
        uid: null,
        email: null,
        role: "user",
        token: null,
        logged_in: false
      };
    default:
      return state;
  }
};

export default auth;