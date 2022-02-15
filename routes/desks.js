const { Router } = require('express')
const User = require('../models/User')
const router = Router()

router.get('/', async (req, res) => {
    const users = await User.find({}) 
    res.render('index', {
        title: 'Users list',
        users
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create user'
    })
})


router.post('/create', async (req, res) => {
    if (req.body._id == '') {
        insertUser(req, res)
    }
    else {
        updateUser(req, res)
    }
})

async function insertUser(req, res) {
    const user = new User({
        username: req.body.username
    })

    await user.save((err, doc) => {
        if(!err) {
            res.redirect('/')
        }
        else {
            console.log('Error during record insertion: ' + err)
        }
    })
}

function updateUser(req, res) {
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err) {
            res.redirect('/')
        }
        else {
            console.log(err)
        }
    })
}

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render('create', {
                title: 'Update user',
                user: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
     User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/')
        }
        else {
            console.log(err)
        }
    })
})

module.exports = router