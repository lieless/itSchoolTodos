require('dotenv').config()

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/desks')
const path = require('path')
const User = require('./models/User')

const PORT = process.env.PORT || 3000
const URI = process.env.MONGOURI

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

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
