var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
//import * as admin from "firebase-admin";
var fire = require('../../public/src/config/fire');
//import fire from "../../public/src/config/fire";

//få lista med användare
router.post("/admin/userlist", function(req, res) {
  
    let ref = fire.database().ref('users'),
    token = req.body.token;
  
    admin.auth().verifyIdToken(token).then(function(decodedToken) {
      var uid = decodedToken.uid;
  
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
            })
            .catch((error) => { res.json({'result':'error', 'message':error.message}) });
  
          } else {
            res.json({'result':'error', 'message':'role checking error'})
          }
  
        });
      })
      .catch((error) => { res.json({'result':'error', 'message':error.message}) });
  
    })
    .catch((error) => { res.json({'result':'error', 'message':error.message}) });
  
  });

  module.exports = router;