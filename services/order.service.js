const User = require('../models/user.model');

exports.generateMethods = Model => {
    return {
        create: async (user_id, items, shippingAddress, total) => {
            // let user = await User.findOne({ _id: { $eq: user_id } })
            return new Promise((resolve, reject) => {
                Model.find({ user_id: { $eq: user_id } }).then(res => {
                    if (res.length != 0) {
                        Model.updateOne({ user_id: user_id }, {
                            $set: {
                                "shippingAddress": shippingAddress
                            }
                        }).then(res => {
                            if (shippingAddress.save) {
                                User.updateOne({ _id: user_id }, {
                                    $set: {
                                        "shippingAddress": shippingAddress
                                    }
                                }).then(res => {
                                    resolve(true)
                                })
                            }
                        })
                    } else {
                        let newRecord = {
                            user_id: user_id,
                            paymentStatus: '',
                            status: '',
                            total: total,
                            items: items,
                            shippingAddress: shippingAddress
                        }
                        Model.create(newRecord).then(async res => {
                            if (newRecord.shippingAddress.save) {
                                await User.updateOne({ _id: user_id }, {
                                    $set: {
                                        "shippingAddress": shippingAddress
                                    }
                                }).then(res => {
                                    resolve(true)
                                })
                            }
                            resolve(true)
                        });
                    }
                })
            });
        },

        getOrderByUserId: user_id => {
            return new Promise((resolve, reject) => {
                Model.find({ user_id: { $eq: user_id } }).then(res => {
                    if (res.length == 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            });
        },
    }
} 