const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner')

router.get('/', function (req, res) {
    res.send('hey');
})

router.post('/create', async function (req, res) {
    let owners = await ownerModel.find();

    if (owners.lenth > 0) res.status(503).send("you  dont have permission to create");
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,

    })
    res.status(201).send(createdOwner);
})

router.get('/admin', function (req, res) {
    let success = req.flash("success");
    res.render('createproducts', { success });
})

module.exports = router;