var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
var fire = require('../../../react-ui/src/config/fire');

//ta bort kommentar
router.post("/admin/delete/comment", function(req, res) {
  
  let postid = req.body.postid,
  token = req.body.token,
  postedby = req.body.postedby;

  admin.auth().verifyIdToken(token).then(function(decodedToken) {

    fire.database().ref('users').orderByChild("uid").equalTo(decodedToken.uid).once("value").then(function(snapsrole) {
      snapsrole.forEach(snapshotrole => {

        if (snapshotrole.val().role === 'admin' || postedby === decodedToken.uid) {

          fire.database().ref('posts/'+postid).once('value', function(snapshot){
            snapshot.ref.remove();
          })
          .then(() => res.json({'result':'success'}))
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