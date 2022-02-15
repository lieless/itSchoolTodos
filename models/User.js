const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {
        type: String,
        required: 'This field is required'
    }
    // todos: [Todo]
})

// const Todo = new Schema({
//     name: {type: String, requred: true},
//     checked: {type: Boolean},

// })

module.exports = model('User', User)