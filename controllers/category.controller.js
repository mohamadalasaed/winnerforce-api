const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');
const { categoryMethods } = require('../services/category.service');
const category = categoryMethods(Category);

router.get('/:type', (req, res, next) => {
    category.getByType(req.params.type)
    .then(data => res.send(data))
    .catch(err => next(err))
});


module.exports = router;