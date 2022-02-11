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
        title: 'Create desk'
    })
})


router.post('/create', async (req, res) => {
    const user = new User({
        username: req.body.username
    })

    await user.save()
    res.redirect('/')
})

router.delete('/id', function(req, res) {
    console.log(req.params)
    const id = req.params.id;
    User.findOneAndDelete({_id: id}).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
    res.redirect('/')
})


module.exports = router