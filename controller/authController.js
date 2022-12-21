const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

exports.register = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if email exists in DB.
    const emailExist = await User.findOne({ email: email })
    if (emailExist) {
        res.status(401).send({ errorMsg: 'Email already exists.' })
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 8);

    const user = new User({
        email: email,
        password: hashPassword
    })

    try {
        const saveUser = await user.save()
        res.status(200).send({ successMsg: 'Signed up sucess.' })
    } catch (error) {
        res.status(401).send({ errorMsg: 'Something went wrong.' })
    }

}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};