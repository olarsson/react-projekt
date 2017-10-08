var express = require("express");
var router = express.Router();

import * as admin from "firebase-admin";
import fire from "../client/src/config/fire";

var serviceAccount = require("../project-test-4585e73d8343.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

/*
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
*/



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




  router.post("/admin_create_user", function(req, res) {
    
    let ref = fire.database().ref('users'),
    //token = req.body.token,
    email = req.body.email,
    uid = req.body.uid,
    role;
      
    ref.once("value", function(snapshot) {

      role = (snapshot.numChildren() === 0 ? 'admin' : 'user');

      ref.push({
        email: email,
        uid: uid,
        role: role
      }).then(() => {
        res.json({
          'result':'success',
          'uid': uid,
          'role': role
        })
      }).catch((error) => {
        res.json({'result':'error', 'message':error})
      })

    })

  });




  router.post("/admin_get_userlist", function(req, res) {

    let ref = fire.database().ref('users'),
    token = req.body.token;

    admin.auth().verifyIdToken(token).then(function(decodedToken) {
      var uid = decodedToken.uid;
      //extra check här? kolla ifall decodedToken.uid har role = admin?

      ref.orderByChild("uid").equalTo(uid).once("value").then(function(snapsrole) {
        snapsrole.forEach(snapshotrole => {
          
          if (snapshotrole.val().role === 'admin') {
            ref.orderByChild("uid").once("value").then(function(snaps) {
              let x = [], i = 0;
              snaps.forEach(snapshot => {
                i++;
                x.push({
                  uid: snapshot.val().uid,
                  uid_users: snapshot.key,
                  email: snapshot.val().email,
                  role:  snapshot.val().role,
                  key: i
                })
              });
              res.json({'result':'success', users: x})
            }).catch(function(error) {
              res.json({'result':'error', 'message':error})
            });
          } else {
            res.json({'result':'error', 'message':'role checking error'})
          }

        });
      }).catch(function(error) {
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

  //console.info(delete_uid, token)
  
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

});

module.exports = router;
