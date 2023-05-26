const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    shippingAddress : [
        {
            firstname: { type: String },
            lastname: { type: String },
            company: { type: String },
            address: { type: String },
            apartment: { type: String },
            city : { type: String },
            phone : { type: Number },
            postalCode : { type: Number },
            save: { type: Boolean },
        }
    ],
});