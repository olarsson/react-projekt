const reducer = (
  state = {
    logged_in: false
  },
  action
) => {
  switch (action.type) {
    case "LOGGED_IN":
      console.info('logge din yeah!! ', action.role)
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
    case "LOGCHANGE":
      if (state.log) {
        return { log: state.log + 1 };
      } else {
        return { log: 1 };
      }
    default:
      return state;
  }
};

export default reducer;