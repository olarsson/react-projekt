var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
//import * as admin from "firebase-admin";
var fire = require('../../client/src/config/fire');
//import fire from "../../client/src/config/fire";

//hämta alla topics och kommentarer
router.post("/board/view", function(req, res) {
  
  let x = [], x2 = [], i;
  
  fire.database().ref("topics").orderByChild("created").once("value").then(function(snaps) {
    i = 0;
    snaps.forEach(snapshot => {
      i++;
      x.push({
        id: snapshot.key,
        postedby: snapshot.val().postedby,
        created: Date(snapshot.val().created), 
        text: snapshot.val().text,
        key: i
      });
    });

    fire.database().ref("posts").orderByChild("created").once("value").then(function(snaps) {
      i = 0;
      snaps.forEach(snapshot => {
        i++;
        x2.push({
          id: snapshot.key,
          postedby: snapshot.val().postedby,
          created: Date(snapshot.val().created),
          text: snapshot.val().text,
          reference: snapshot.val().reference,
          key: i
        });
      });

      res.json({
        'result':'success',
        'topics':x,
        'posts': x2
      })

    })
    .catch((error) => { res.json({'result':'error', 'message':error.message}) });

  })
  .catch((error) => { res.json({'result':'error', 'message':error.message}) });

});


module.exports = router;