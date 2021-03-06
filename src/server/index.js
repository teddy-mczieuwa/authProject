
const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { Nuxt, Builder } = require('nuxt')

const customConfig = require('../config/keys')
const User = require('./models/user')
mongoose.connect(customConfig.mongoURI, {"useNewUrlParser": true},
 function(err){
  if(err) {
    console.log('Error connecting to the database')
  } else {
    console.log('Successfully connected to the database')
  }
})

const authRouter = require('./routes/authRoutes')(User)
const userRouter = require('./routes/userRoutes')()

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/', userRouter)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
