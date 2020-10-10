const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const router = Router()

router.post('/register',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Min length of password is 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration datas'
            })
        }

        const {email, password} = req.body

        const emailExist = await User.findOne({email})
        if (emailExist) {
            return res.status(400).json({
                message: 'Such user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()
        res.status(201).json({
            message: 'New user is successfully added'
        })
    }
    catch (e) {
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.post('/login',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Put Your password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login datas'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({
                    message: 'Such user not exist'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(400).json({
                    message: 'Wrong password'
                })
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtKey'),
                { expiresIn: '24h' }
            )
            res.json({
                token, userId: user.id
            })
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

module.exports = router