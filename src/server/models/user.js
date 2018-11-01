const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: {type: String},
    gravatar: {type: String},
    created_on: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema)