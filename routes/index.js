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







router.post("/make_post", function(req, res) {
  
    let message = req.body.message,
    token = req.body.token;
  
    admin.auth().verifyIdToken(token).then(function(decodedToken) {

      fire.database().ref("posts").push({
        postedby: decodedToken.uid,
        text: message,
        created: new Date().getTime()
        //likes: {}
      })
      .then(result => {
        res.json({'result':'success'})
      })
      .catch(function(error) {
        res.json({'result':'error', 'message':error})
      });

    })
    .catch(function(error) {
      res.json({'result':'error', 'message':error})
    });
  
  });







router.post("/admin_delete_user", function(req, res) {

  let ref = fire.database().ref('users'),
  delete_uid = req.body.delete_uid,
  //admin_email = req.body.admin_email,
  //admin_password = req.body.admin_password,
  token = req.body.token;

  console.info(delete_uid, token)
  
  //console.info(admin_email, admin_password, delete_uid, token)

  admin.auth().verifyIdToken(token).then(function(decodedToken) {
    //var uid = decodedToken.uid;
    //extra check här? kolla ifall decodedToken.uid har role = admin?

    admin.auth().deleteUser(delete_uid).then(function() {
      ref.orderByChild('uid').equalTo(delete_uid).once('value', snapshot => {
        //User deleted - sucess
        let updates = {};
        snapshot.forEach(child => updates[child.key] = null);
        ref.update(updates);
        res.json({'result':'success'})
      }).catch(function(error) {
        //User deleted - failure
        res.json({'result':'error', 'message':error})
      });
  
    })
    .catch(function(error) {
      //User deleted - failure
      res.json({'result':'error', 'message':error})
    });

  })
  .catch(function(error) {
    res.json({'result':'error', 'message':error})
  });



  /*
  fire.auth().signInWithEmailAndPassword(admin_email, admin_password).then(user => {

    admin.auth().deleteUser(delete_uid).then(function() {
      ref.orderByChild('uid').equalTo(delete_uid).once('value', snapshot => {
        //User deleted - sucess
        let updates = {};
        snapshot.forEach(child => updates[child.key] = null);
        ref.update(updates);
        res.json({'result':'success'})
      }).catch(function(error) {
        //User deleted - failure
        res.json({'result':'error', 'message':error})
      });
  
    })
    .catch(function(error) {
      //User deleted - failure
      res.json({'result':'error', 'message':error})
    });

  })
  .catch(function(error) {
    res.json({'result':'error', 'message':error})
  });
  */

  /*
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
  */  

});

module.exports = router;
