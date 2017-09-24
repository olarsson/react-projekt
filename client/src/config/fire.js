import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyAPyfo5lf9472xFGK0dhiJVUxkeqtoyWSo",
  authDomain: "project-test-ab10f.firebaseapp.com",
  databaseURL: "https://project-test-ab10f.firebaseio.com",
  projectId: "project-test-ab10f",
  storageBucket: "",
  messagingSenderId: "452972685925"
};
var fire = firebase.initializeApp(config);
export default fire;