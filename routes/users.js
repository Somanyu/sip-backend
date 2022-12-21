var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/data', function(req, res, next) {
  // res.send('respond with a resource');
  const email = req.body.email
  const password = req.body.password

  // const responseData = {myEmail: email, myPassword: password}
  // console.log(responseData);
  
  const userData = new User(req.body)

  userData.save((err) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.send({ message: 'Form data saved successfully.'})
    }
  })

  
});

module.exports = router;
