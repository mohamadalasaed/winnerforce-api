const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const { generateCrudMethods } = require('../services');
const { generateMethods } = require('../services/product.service');
const productCrud = generateCrudMethods(Product);
const productMethods = generateMethods(Product);
const { validateDbId, raiseRecord404Error, verifyAdminToken, verifySecretClient } = require('../middlewares');

router.get('/men', (req, res, next) => {
    productMethods.getMen("men")
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.get('/women', (req, res, next) => {
    productMethods.getWomen("women")
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.get('/accessories', (req, res, next) => {
    productMethods.getAccessories("accessories")
        .then(data => res.send(data))
        .catch(err => next(err))
});

router.get('/:id', validateDbId, (req, res, next) => {
    productCrud.getById(req.params.id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                raiseRecord404Error(req, res);
            }
        })
        .catch(err => next(err))
});

router.get('/getBySlug/:slug', (req, res, next) => {
    productMethods.getProductBySlug(req.params.slug)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                raiseRecord404Error(req, res);
            }
        })
        .catch(err => next(err))
});

router.get('/random/:type', (req, res) => {
    productMethods.getRandomProducts(req.params.type)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                raiseRecord404Error(req, res);
            }
        })
        .catch(err => next(err))
});

router.post('/search', (req, res, next) => {
    productMethods.search(req.body.type, req.body.toSearch)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                raiseRecord404Error(req, res);
            }
        })
        .catch(err => next(err))
});

router.post('/getProductsByCategory', (req, res, next) => {
    if (req.body.category == 'ALL') {
        productMethods.getMen(req.body.type)
            .then(data => res.send(data))
            .catch(err => next(err))
    } else {
        productMethods.getByCategory(req.body.type, req.body.category)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    raiseRecord404Error(req, res);
                }
            })
            .catch(err => next(err))
    }
});

router.post('/getByCategoryAndSearch', (req, res, next) => {
    productMethods.getByCategoryAndSearch(req.body.type, req.body.category,req.body.toSearch)
    .then(data => res.send(data))
    .catch(err => next(err))
});

router.post('/', verifyAdminToken, verifySecretClient, (req, res, next) => {
    const newRecord = {
        category: req.body.category,
        title: req.body.title,
        slug: req.body.slug,
        price: req.body.price,
        sku: req.body.sku,
        description: req.body.description,
        size_s: req.body.size_s,
        size_m: req.body.size_m,
        size_l: req.body.size_l,
        size_xl: req.body.size_xl,
        size_xxl: req.body.size_xxl,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
        img4: req.body.img4,
        imgs: req.body.imgs,
        type: req.body.type,
    }
    productCrud.create(newRecord)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))

});

router.put('/:id', verifyAdminToken, verifySecretClient, validateDbId, (req, res) => {
    const updatedRecord = {
        category: req.body.category,
        title: req.body.title,
        slug: req.body.slug,
        price: req.body.price,
        sku: req.body.sku,
        description: req.body.description,
        size_s: req.body.size_s,
        size_m: req.body.size_m,
        size_l: req.body.size_l,
        size_xl: req.body.size_xl,
        size_xxl: req.body.size_xxl,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
        img4: req.body.img4,
        imgs: req.body.imgs,
        type: req.body.type,
    }
    productCrud.update(req.params.id, updatedRecord)
        .then(data => {
            if (data) res.send(data);
            else raiseRecord404Error(req, res);
        })
        .catch(err => next(err))
});

router.delete('/:id', verifyAdminToken, verifySecretClient, validateDbId, (req, res) => {
    productCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data);
            else raiseRecord404Error(req, res);
        })
        .catch(err => next(err))
});

module.exports = router;