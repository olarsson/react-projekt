const reducer = (
  state = {
    logged_in: false
  },
  action
) => {
  switch (action.type) {
    case "LOGGED_IN":
      //console.info('logge din yeah!! ', action)
      return {
        uid: action.uid,
        email: action.email,
        logged_in: true
      };
    case "LOGGED_OUT":
      return {
        uid: null,
        email: null,
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