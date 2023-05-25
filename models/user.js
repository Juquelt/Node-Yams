const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    wins: {
        type: Array
    }
})

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)

/*
 {
    _id: ObjectId("646f3081ff474cc85d6849f8"),
    username: 'jm',
    password: '$2b$10$1XSNEGuyTDDHmRZQfpUq0u5H.zK9l1lMhCvCW2ZeB2YHmRYr3a8uS',
    wins: ['Pain au chocolat', 'Gâteau d\'anniversaire']
  }
 */
