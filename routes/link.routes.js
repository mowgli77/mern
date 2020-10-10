const { Router } = require('express')
const shortid = require('shortid')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middlware/auth.middlware')

const router = Router()

router.post('/generate',
    auth,
    async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body

        const existing = await Link.findOne({ from })
        if (existing) {
            return res.json({
                link: existing
            })
        }

        const code = shortid.generate()
        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, from, to, owner: req.user.userId
        })
        await link.save()
        res.status(201).json({ link })
    }
    catch (e) {
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.get('/',
    auth,
    async (req, res) => {
        try {
            const links = await Link.find({ owner: req.user.userId })
            res.json(links)
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })

router.get('/:id',
    auth,
    async (req, res) => {
        try {
            const link = await Link.findById(req.params.id)
            res.json(link)
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })


module.exports = router