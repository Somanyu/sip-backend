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

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        // Check if email exists in DB.
        if (!user) {
            return res.status(401).send({ errorMsg: 'E-mail not found!' })
        }

        // Check if password is correct.
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(401).send({ errorMsg: 'Incorrect password.' })
        }

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).send({ successMsg: 'Logged in successfully.' })
    } catch (error) {
        console.log(error);
    }
}