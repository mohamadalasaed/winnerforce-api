const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

//local imports
const connectDB = require('./db.js');
const employeeRoutes = require('./controllers/employee.controller');
const {errorHandler} = require('./middlewares');

const app = express()

//middlewares
app.use(bodyParser.json());
app.use(cors({
  // origin:'http://localhost:4200',
  origin: 'https://mohamadalasaed.github.io'
}));
app.use('/api/employees', employeeRoutes);
app.use(errorHandler);
  

  connectDB()
    .then(()=>{
        console.log('db connection succeeded');
        app.listen(3000)
    })
    .catch(err => console.log(err))
  
   