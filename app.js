require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3000

const URI = process.env.MONGOURI

async function start() {
    try {
      await mongoose.connect(URI, {
          useNewUrlParser: true
      })
      app.listen(PORT, () => console.log(`Server has beeen started on port ${PORT}...`))
    } catch (err) {
        console.log(err)
    }
}

start()