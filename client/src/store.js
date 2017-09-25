import { createStore } from 'redux';

const user = (
  state = {
    logged_in: false
  }, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        uid: action.uid,
        email: action.email,
        logged_in: true
      }
    case 'LOGGED_OUT':
      return {
        logged_in: false
      }
    default:
      return state
  }
}

const store = createStore(
  user, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() =>
  console.info('state: ' + store.getState().logged_in)
)

export default store;