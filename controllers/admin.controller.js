const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.model');
const { adminMethods } = require('../services/admin.service');
const admin = adminMethods(Admin);
const {validateDbId, raiseRecord404Error} = require('../middlewares');

router.post('/register', (req, res, next) => {
    admin.register(req.body.firstname,req.body.lastname,req.body.email,req.body.password)
    .then((user) => res.status(200).json({user:user,msg:"added"}))
    .catch(err => next(err))
});

router.post('/login', (req, res, next) => {
    admin.login(req.body.email,req.body.password)
    .then((doc) => res.status(200).json(doc))
    .catch(err => next(err))
});

module.exports = router;