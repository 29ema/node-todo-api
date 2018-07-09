var mongoose = require('mongoose');

mongoose.promise = global.promise; //set up to use promises
mongoose.connect(process.env.MONGODB_URI)

module.exports = { mongoose };

//process.env.NODE_ENV ==='production'