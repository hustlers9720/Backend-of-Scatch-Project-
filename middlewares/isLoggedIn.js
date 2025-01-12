const jwt = require('jsonwebtoken');
const userModel = require('../models/user'); // Ensure correct path to your user model

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash('error', 'You need to login first');
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        req.flash('error', 'Authentication failed, please log in again');
        res.redirect('/');
    }
};
