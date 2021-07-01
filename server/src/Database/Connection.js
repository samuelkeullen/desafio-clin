const mongoose = require('mongoose')
//DATABASE UPDATED
mongoose.connect('',
{

    useNewUrlParser: true,
    useUnifiedTopology: true
})



mongoose.Promise = global.Promise

module.exports = mongoose;