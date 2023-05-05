const mongoose = require('mongoose');

module.exports = mongoose.model('Employee', {
    fullName : { type: String },
    email : { type: String },
    bloodType : { type: String },
    phoneNB : { type: Number },
    position : { type: String },
    salary : { type: Number }
});

