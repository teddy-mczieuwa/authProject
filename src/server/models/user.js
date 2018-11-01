const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: {type: String},
    imageUrl: {type: String},
    created_on: {type: Date, default: Date.now}
})

userSchema.methods.gravatar = function(size){
    if (!size) size = 200
    if (!this.email) {
      return 'https://gravatar.com/avatar/?s=' + size + '&d=retro'
    }
    var md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro'
  
  }

userSchema.methods.verifyPassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) {
        console.log('error: ' + err);
        return callback(err)
        }
        if (!isMatch) {
        console.log('isMatch is false');
        }
        callback(null,isMatch)
    })
}

userSchema.pre('save', function(next){
    const user = this
    bcrypt.genSalt(10, function(err, salt){
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) next(err)
            user.password = hash
            next()
        })
    })
})



module.exports = mongoose.model('User', userSchema)