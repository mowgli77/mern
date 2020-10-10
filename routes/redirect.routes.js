const { Router } = require('express')
const Link = require('../models/Link')

const router = Router()


router.get('/:code', async (req, res) => {
        try {
            const link = await Link.findOne({code: req.params.code})
            if (link) {
                link.clicks++
                link.save()
                res.redirect(link.from)
            }

            return res.status(404).json({message: 'Link not found'})
        }
        catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    })


module.exports = router