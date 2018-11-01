const jwt = require('jwt-simple')
const config = require('../../config/keys')

const createToken = (user) => {
    const timeStamp = new Date().getTime()
    return jwt.encode({sub: user.id, iat: timeStamp}, config.secret)
}

const authController = (User) => {
    const signIn = (req, res) => {

        const email = req.body.email
        const password = req.body.password

        if (!email && !password) {
           return res.status(422).json({err: 'Please enter an email and password'})
        } 

        User.findOne({email: email}, function(err, existingUser){
            if(existingUser){
                return res.status(422).send({err:'A user with this email already exists'})
            }

            if(!existingUser){
                const user = new User()
                user.email = email
                user.password = password
                user.imageUrl = user.gravatar()

                user.save(function(err, user){
                    if(err){
                        res.status(500).json({err:'Error saving to the database'})
                    }
                    else {
                        res.json({token: createToken(user)})
                    }
                })
            }
        })
        
    }

    return {
        signIn
    }
}

module.exports = authController