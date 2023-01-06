const router = require('express').Router()

router.get('/', (req,res) => res.json('ini adalah home page!'))

module.exports = router