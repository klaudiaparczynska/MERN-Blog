const router = require('express').Router()
const User = require('../models/User')
const authUser = require('../middleware/auth')


router.post('/', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.create({email, password})
        const token = await user.generateAuthToken()
        res.status(201).json({user, token})
    } catch(e) {
        let msg
        if(e.code == 11000) msg = 'Email already exists'
        else msg = e.message
        res.status(400).json(msg)
    }
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.json({user, token})
    } catch(e) {
        console.log("Login", password, email)
        res.status(400).json(e.message)
    }

})


//logout
router.delete('/logout', authUser, async(req, res)=> {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token !== req.token
        })
        await req.user.save()
        res.status(200).send()
    }
    catch(e) {
        res.status(400).json(e.message)

    }

})

module.exports = router