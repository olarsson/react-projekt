var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
var fire = require('../../../react-ui/src/config/fire');

//ändra roll
router.post("/admin/change/role", function(req, res) {
  
  let changeuid = req.body.change_uid,
  token = req.body.token,
  role = req.body.role;

  admin.auth().verifyIdToken(token).then(function(decodedToken) {

    fire.database().ref('users').orderByChild("uid").equalTo(decodedToken.uid).once("value").then(function(snapsrole) {
      snapsrole.forEach(snapshotrole => {

        if (snapshotrole.val().role === 'admin' || postedby === decodedToken.uid) {

          fire.database().ref('users').orderByChild("uid").equalTo(changeuid).once("value").then(function(snapshot) {
            var update_here = Object.keys(snapshot.val())[0];

            fire.database().ref('users/'+update_here).update({role: role})
            .then(() => res.json({'result':'success'}))
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