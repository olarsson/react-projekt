import * as admin from "firebase-admin";
import fire from "../../react-ui/src/config/fire";

var serviceAccount = require("../config/project-test-4585e73d8343.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});