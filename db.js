const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://admin:admin@cluster0.nkoemvd.mongodb.net/employee_db?retryWrites=true&w=majority';

module.exports = () => {
    return mongoose.connect(dbURI);
}