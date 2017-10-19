var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
var fire = require('../../../react-ui/src/config/fire');

//ta bort topic och alla kommenterar till det
router.post("/admin/delete/topic_and_comments", function(req, res) {
  
  let topicid = req.body.topicid,
  token = req.body.token;

  admin.auth().verifyIdToken(token).then(function(decodedToken) {

    fire.database().ref('users').orderByChild("uid").equalTo(decodedToken.uid).once("value").then(function(snapsrole) {
      snapsrole.forEach(snapshotrole => {
        
        if (snapshotrole.val().role === 'admin') {

          //ta bort kommentarer
          fire.database().ref("posts").orderByChild("reference").equalTo(topicid).once("value").then(function(snaps) {
            snaps.forEach(snapshot => {
              snapshot.ref.remove();
            });
            //ta bort topic
            fire.database().ref('topics/'+topicid).once('value', function(snapshot) {
              snapshot.ref.remove();
            })
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