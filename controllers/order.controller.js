const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const { generateMethods } = require('../services/order.service');
const orderMethods = generateMethods(Order);
const { validateDbId, raiseRecord404Error, verifySecretClient } = require('../middlewares');

router.get('/:user_id', validateDbId, (req, res, next) => {
    orderMethods.getOrderByUserId(req.params.user_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    orderMethods.create(req.body.user_id, req.body.items, req.body.paymentStatus, req.body.shippingAddres, req.body.total)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
});

module.exports = router;