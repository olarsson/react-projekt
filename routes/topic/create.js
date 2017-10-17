var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
//import * as admin from "firebase-admin";
var fire = require('../../public/src/config/fire');
//import fire from "../../public/src/config/fire";

//skapa topic
router.post("/topic/create", function(req, res) {
  
  let message = req.body.message,
  token = req.body.token;
  
  if (message.length < 1 || message.length > 1000) {

    res.json({'result':'error', 'message':'Your comment must be between between 1 to 1000 characters.'})

  } else { 

    admin.auth().verifyIdToken(token).then(function(decodedToken) {
  
      fire.database().ref('users').orderByChild("uid").equalTo(decodedToken.uid).once("value").then(function(snapsrole) {
        snapsrole.forEach(snapshotrole => {
          
          if (snapshotrole.val().role === 'admin') {
            
            fire.database().ref("topics").push({
              postedby: decodedToken.uid,
              text: encodeURI(message),
              created: new Date().getTime()
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

  }

});

module.exports = router;