
const express = require('express')
const consola = require('consola')
const mongoose = require('mongoose')
const { Nuxt, Builder } = require('nuxt')

const config = require('../config/keys')
const User = require('./models/user')
mongoose.connect(config.mongoURI, function(err){
  if(err) {
    console.log('Error connecting to the database')
  } else {
    console.log('Successfully connected to the database')
  }
})

const authRouter = require('./routes/authRoutes')(User)

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)
app.use('/auth', authRouter)

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
