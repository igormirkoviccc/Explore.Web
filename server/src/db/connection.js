const mongoose = require('mongoose');

module.exports.connection = async () =>{
    try{
        await mongoose.connect('mongodb://login:password@db:27017', {useNewUrlParser: true, useUnifiedTopology: true})
        mongoose.set('debug', true);
    }catch (e) {
        throw e;
    }
};
