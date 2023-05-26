const mongoose = require('mongoose');

module.exports = mongoose.model('Cart', {
    user_id : { type: String },
    items : [
        {
            product_id: { type: String },
            qty: { type: Number },
            price: { type: Number },
            totalPriceForItem: { type: Number },
            title : { type: String },
            size : { type: String },
            img : { type: String },
        }
    ]
});

