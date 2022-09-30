const express = require('express')
const router = express.Router()
const pages_url = require('../settings.js')


router.get('/', (req, res) => {

    res.render(pages_url+'/contact.ejs',{page: 'contact'})// gdy używamy ejs 
        // natomiast gdy chcemy użyc .html to res.sendFile
})


module.exports = router