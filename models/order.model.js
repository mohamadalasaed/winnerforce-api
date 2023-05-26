const mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
    user_id : { type: String },
    paymentStatus: { type: String },
    status: { type: String },
    total: { type: Number },
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
    ],
    shippingAddress : [
        {
            firstname: { type: String },
            lastname: { type: String },
            company: { type: String },
            address: { type: String },
            apartment: { type: String },
            city : { type: String },
            phone : { type: String },
            postalCode : { type: String },
            save: { type: Boolean },
        }
    ],
});

