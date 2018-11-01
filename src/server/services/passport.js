const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const config = require('../../config/keys')
const User = require('../models/user')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
  }

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, function(err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
}))

passport.use(new LocalStrategy({usernameField:'email'}, (email,password,done) => {
    User.findOne({email:email}, function(err, user){
      if (err) {
        console.log('Error didnt find email')
        return done(err)
      }
  
      if (!user) {
        console.log('Error: did not find user')
        return done(null, false)
      }
  
      user.verifyPassword(password, function(err,isMatch){
        if (err) {
          console.log('Error: password incorrect');
          return done(err)
        }
        if (!isMatch) {
          console.log('Error: no match');
          return done(null, false)
        }
        return done(null,user)
      })
    }) 
}))