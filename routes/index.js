const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const productModel = require('../models/product')
const userModel = require('../models/user')

router.get('/', function (req, res) {
    let error = req.flash('error')
    res.render('index', { error, isLoggedIn: false });
})

router.get('/shop', isLoggedIn, async function (req, res) {
    let products = await productModel.find()
    res.render('shop', { products });
})

router.get('/addtocart/:productid', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    res.redirect('/shop');
})

router.get('/cart', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart');

    const cartWithBills = user.cart.map(item => {
        const bill = (Number(item.price) + 20) - Number(item.discount);
        return {
            ...item._doc,
            bill
        };
    });

    res.render('cart', { user, cart: cartWithBills });
});


router.get('/logout', function (req, res) {
    res.cookie('token', '')
    res.redirect('/');
})
module.exports = router;