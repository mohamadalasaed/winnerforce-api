require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');


//local imports
const connectDB = require('./db.js');
const productRoutes = require('./controllers/product.controller');
const adminRoutes = require('./controllers/admin.controller');
const userRoutes = require('./controllers/user.controller');
const categoryRoutes = require('./controllers/category.controller.js');
const cartRoutes = require('./controllers/cart.controller.js');
const orderRoutes = require('./controllers/order.controller.js');
const stripeRoutes = require('./controllers/stripe.controller.js');
const { errorHandler } = require('./middlewares');

const app = express()

//middlewares
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
  // origin: 'https://mohamadalasaed.github.io'
}));
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use(errorHandler);


connectDB()
  .then(() => {
    console.log('db connection succeeded');
    app.listen(3000)
  })
  .catch(err => console.log(err))

