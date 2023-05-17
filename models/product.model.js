const mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
    category : { type: String },
    title : { type: String },
    slug : { type: String },
    price : { type: String },
    sku : { type: String },
    description : { type: String },
    size_s : { type: Number },
    size_m : { type: Number },
    size_l : { type: Number },
    size_xl : { type: Number },
    size_xxl : { type: Number },
    img1 : { type: String },
    img2 : { type: String },
    img3 : { type: String },
    img4 : { type: String },
    imgs : { type: Number },
    type : { type: String },
});

