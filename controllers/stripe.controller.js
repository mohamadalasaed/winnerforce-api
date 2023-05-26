const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
    const line_items = req.body.items.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [item.img]
                },
                unit_amount: item.price * 100,
            },
            quantity: item.qty,
        }
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "https://mohamadalasaed.github.io/winnerforce-angular-online/checkout/shipping/payment",
    });
    res.send({ url: session.url });
});

module.exports = router;