const mongoose = require('mongoose');

module.exports = mongoose.model('Category', {
    name : { type: String },
    type : { type: String },
});
