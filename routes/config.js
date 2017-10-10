import * as admin from "firebase-admin";
import fire from "../client/src/config/fire";

var serviceAccount = require("../project-test-4585e73d8343.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

module.exports = {
  fire: fire,
  admin: admin
}