const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const { generateCrudMethods } = require('../services');
const { generateMethods } = require('../services/cart.service');
const cartCrud = generateCrudMethods(Cart);
const cartMethods = generateMethods(Cart);
const { validateDbId, raiseRecord404Error, verifySecretClient } = require('../middlewares');

router.get('/:user_id', (req, res, next) => {
    cartMethods.getProductsByUserId(req.params.user_id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                raiseRecord404Error(req, res);
            }
        })
        .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    cartMethods.addToCart(req.body.user_id, req.body.item)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
});

router.post('/create', (req, res, next) => {
    let newRecord = {
        user_id: req.body.user_id,
        items: req.body.items
    }
    cartMethods.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
});


router.post('/remove', (req, res, next) => {
    cartMethods.removeFromCart(req.body.user_id, req.body.product_id, req.body.size)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
});

router.post('/update', (req, res, next) => {
    cartMethods.update(req.body.user_id, req.body.product_id, req.body.size, req.body.qty)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
});

module.exports = router;