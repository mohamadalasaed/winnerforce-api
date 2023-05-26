const Cart = require('../models/cart.model');

exports.generateMethods = Model => {
    return {


        getProductsByUserId: async user_id => {
            let res = {
                total: await sumTotal(user_id),
                products: await getAll(user_id)
            }
            return res;
        },


        create: record => {
            return Model.create(record).then(async data => {
                let res = {
                    total: await sumTotal(record.user_id),
                    products: await getAll(record.user_id)
                }
                return res;
            })
        },

        addToCart: (user_id, item) => {
            return new Promise((resolve, reject) => {
                Model.findOne({ user_id: { $eq: user_id } })
                    .then((exists) => {
                        if (exists) {
                            let products = exists.items;
                            let productInCart = products.find(res => {
                                return (res.product_id === item.product_id && res.size === item.size) || (res.product_id === item.product_id && res.size === null);
                            });
                            if (!productInCart) {
                                Model.updateOne(
                                    { user_id: user_id },
                                    { $push: { items: item } }
                                ).then(async res => {
                                    resolve({
                                        total: await sumTotal(user_id),
                                        products: await getAll(user_id)
                                    })
                                })
                            } else {
                                if (productInCart.size !== item.size && productInCart.size !== null) {
                                    Model.updateOne(
                                        { user_id: user_id },
                                        { $push: { items: item } }
                                    ).then(async res => {
                                        resolve({
                                            total: await sumTotal(user_id),
                                            products: await getAll(user_id)
                                        })
                                    })
                                } else {
                                    let newCart = products;
                                    newCart.forEach(p => {
                                        if (p.product_id == item.product_id && p.size == item.size) {
                                            p.qty += item.qty
                                            p.totalPriceForItem += item.qty * item.price;
                                        }
                                    })
                                    Model.updateOne({ user_id: user_id }, { $set: { 'items': newCart } }).then(async res => {
                                        resolve({
                                            total: await sumTotal(user_id),
                                            products: await getAll(user_id)
                                        })
                                    })
                                }
                            }

                        } else {
                            const newRecord = {
                                user_id: user_id,
                                items: item,
                            }
                            Model.create(newRecord).then(async res => {
                                resolve({
                                    total: await sumTotal(user_id),
                                    products: await getAll(user_id)
                                })
                            })
                        }
                    })
            });
        },

        update: (user_id, product_id, size, qty) => {
            return new Promise(async (resolve, reject) => {
                let products = await getAll(user_id);
                let productInCart = products.find(res => {
                    return (res.product_id === product_id && res.size === size) || (res.product_id === product_id && res.size === null);
                });
                Model.updateOne({ user_id: user_id, "items.product_id": product_id }, {
                    $set: {
                        "items.$.qty": productInCart.qty + qty,
                        "items.$.totalPriceForItem": productInCart.totalPriceForItem + (qty * productInCart.price)
                    }
                }).then(async res => {
                    resolve({
                        total: await sumTotal(user_id),
                        products: await getAll(user_id)
                    })
                })
            });
        },

        removeFromCart: (user_id, product_id, size) => {
            return new Promise((resolve, reject) => {
                Model.updateOne({ user_id: user_id }, { $pull: { items: { product_id: product_id, size: size } } }).then(async res => {
                    let products = await getAll(user_id);
                    if(products.length == 0){
                        console.log('test')
                       await Model.deleteOne({ user_id: user_id });
                    }
                    resolve({
                        total: await sumTotal(user_id),
                        products: await getAll(user_id)
                    })
                })
            });
        }
    }
}

async function getAll(user_id) {
    let products = await Cart.findOne({ user_id: { $eq: user_id } }).then(res => {
        if(res != null){
            return res.items
        } else {
            return [];
        }
    })
    return products.reverse();
}

async function sumTotal(user_id) {
    let sum = await Cart.aggregate([{ $match: { user_id: user_id } }, { $unwind: "$items" }, { $group: { _id: null, 'total': { $sum: "$items.totalPriceForItem" } } }]).then(val => {
        if(val[0] != undefined){
            return val[0].total;
        } else {
            return 0;
        }
    })
    return sum;
}