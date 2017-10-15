var express = require("express");
var router = express.Router();
import * as admin from "firebase-admin";
import fire from "../../../client/src/config/fire";

//ta bort användare
router.post("/admin/delete/user", function(req, res) {
  
    let ref = fire.database().ref('users'),
    delete_uid = req.body.delete_uid,
    token = req.body.token;
  
    admin.auth().verifyIdToken(token).then(function(decodedToken) {
  
      fire.database().ref('users').orderByChild("uid").equalTo(decodedToken.uid).once("value").then(function(snapsrole) {
        snapsrole.forEach(snapshotrole => {
  
          if (snapshotrole.val().role === 'admin') {
            
            admin.auth().deleteUser(delete_uid).then(function() {
              ref.orderByChild('uid').equalTo(delete_uid).once('value', snapshot => {
                let updates = {};
                snapshot.forEach(child => updates[child.key] = null);
                ref.update(updates);
                res.json({'result':'success'})
              })
              .catch((error) => { res.json({'result':'error', 'message':error.message}) });
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