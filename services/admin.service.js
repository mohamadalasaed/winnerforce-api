const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');

let privateKey = process.env.privateKey;

exports.adminMethods = Model => {
    return {
        getById: id => {
            return new Promise((resolve, reject) => {
                Model.findOne({ _id: id })
                    .then((exists) => {
                        if (exists) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
            });
        },

        register: (fn, ln, email, password) => {
            return new Promise((resolve, reject) => {
                Model.findOne({ email: email })
                    .then((exists) => {
                        if (exists) {
                            reject('Email is already exists')
                        } else {
                            bcrypt.hash(password, 10).then((hashedPasswored) => {
                                let user = new Admin({
                                    firstname: fn,
                                    lastname: ln,
                                    email: email,
                                    password: hashedPasswored
                                });
                                user.save().then((user) => {
                                    resolve(user)
                                }).catch((err) => {
                                    reject(err);
                                })
                            }).catch((err) => {
                                reject(err);
                            })
                        }
                    });
            });
        },

        login: (email, password) => {
            return new Promise((resolve, reject) => {
                Model.findOne({ email: email })
                    .then((user) => {
                        if (!user) {
                            reject('Invalid email or password')
                        } else {
                            bcrypt.compare(password, user.password).then((same) => {
                                if (same) {
                                    let token = jwt.sign({ id: user._id, role: 'admin' }, privateKey, {
                                        expiresIn: '1h'
                                    })
                                    resolve({ token: token })
                                } else {
                                    reject('Invalid email or password');
                                }
                            }).catch((err) => {
                                reject(err);
                            })
                        }
                    });
            });
        },
    }
}
