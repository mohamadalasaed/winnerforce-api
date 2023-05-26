const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { userMethods } = require('../services/user.service');
const user = userMethods(User);

router.post('/register', (req, res, next) => {
    user.register(req.body.firstname,req.body.lastname,req.body.email,req.body.password)
    .then((user) => res.status(200).json({user:user,msg:"added"}))
    .catch(err => next(err))
});

router.post('/login', (req, res, next) => {
    user.login(req.body.email,req.body.password)
    .then((doc) => res.status(200).json(doc))
    .catch(err => next(err))
});

router.get('/shipping/:id', (req, res, next) => {
    user.getShipping(req.params.id)
    .then((doc) => res.status(200).json(doc))
    .catch(err => next(err))
});

module.exports = router;