var express = require('express');
var router = express.Router();
var User = require('../models/User');
const authController = require('../controller/authController')

/* POST user register. */
router.post('/register', authController.register);

// router.post('/register', function (req, res, next) {
//   // res.send('respond with a resource');
//   const email = req.body.email
//   const password = req.body.password

//   // const responseData = {myEmail: email, myPassword: password}
//   // console.log(responseData);

//   const userData = new User(req.body)

//   userData.save((err) => {
//     if (err) {
//       res.status(500).send({ error: err })
//     } else {
//       res.send({ message: 'Form data saved successfully.' })
//     }
//   })

// });

router.post('/signin', async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email: email });

  // Check if email exists in DB.
  if (user) {
    // Check if password is correct
    if (password == user.password) {
      res.send({ message: 'Logged in successfully' })
      console.log('Logged in successfully');
    } else {
      res.status(401).send({ message: 'Incorrect password.' })
    }
  } else {
    res.status(401).send({ message: 'E-mail not found!' })
  }

})

module.exports = router;
