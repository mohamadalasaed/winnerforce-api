const express = require('express');
const router = express.Router();

const Employee = require('../models/employee.model');
const { generateCrudMethods } = require('../services')
const employeeCrud = generateCrudMethods(Employee)
const {validateDbId, raiseRecord404Error} = require('../middlewares')

router.get('/', (req, res, next) => {
    // Employee.find()
    employeeCrud.getAll()
    .then(data => res.send(data))
    .catch(err => next(err))
});

router.get('/:id', validateDbId, (req, res, next) => {
        // Employee.findById(req.params.id)
        employeeCrud.getById(req.params.id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                raiseRecord404Error(req, res);
            }
        })
        .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    const newRecord = {
        fullName: req.body.fullName,
        email: req.body.email,
        bloodType: req.body.bloodType,
        phoneNB: req.body.phoneNB,
        position: req.body.position,
        salary: req.body.salary,
    }
    // Employee.create(req.body);
    employeeCrud.create(newRecord)
    .then(data => res.status(201).json(data))
    .catch(err => next(err))

});

router.put('/:id', validateDbId, (req, res) => {
    const updatedRecord = {
        fullName: req.body.fullName,
        email: req.body.email,
        bloodType: req.body.bloodType,
        phoneNB: req.body.phoneNB,
        position: req.body.position,
        salary: req.body.salary,
    }
    // Employee.findByIdAndUpdate(req.params.id, req.body, {new:true})
    employeeCrud.update(req.params.id, updatedRecord)
    .then(data => {
        if (data) res.send(data);
        else raiseRecord404Error(req, res);
    })
    .catch(err => next(err))
});

router.delete('/:id', validateDbId, (req, res) => {
    // Employee.findByIdAndDelete(req.params.id)
    employeeCrud.delete(req.params.id)
    .then(data => {
        if (data) res.send(data);
        else raiseRecord404Error(req, res);
    })
    .catch(err => next(err))
});

module.exports = router;