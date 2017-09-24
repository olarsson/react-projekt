var express = require("express");
var router = express.Router();

import * as admin from "firebase-admin";
import fire from "../client/src/config/fire";

var serviceAccount = require("../project-test-4585e73d8343.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/admin_delete", function(req, res) {

  let uid = req.body.uid;
  let ref = fire.database().ref('users');

  admin.auth().deleteUser(uid).then(function() {
    ref.orderByChild('uid').equalTo(uid).once('value', snapshot => {
      //User deleted - sucess
      let updates = {};
      snapshot.forEach(child => updates[child.key] = null);
      ref.update(updates);
      res.json({'result':'deleted'})
    }).catch(function(error) {
      //User deleted - failure
      res.json({'result':'users - ' + error})
    });

  })
  .catch(function(error) {
    //User deleted - failure
    res.json({'result':'admin - ' + error})
  });    

});

module.exports = router;
