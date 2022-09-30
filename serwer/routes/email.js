const express = require('express')
const router = express.Router()

router.post('/add', (req, res) => {

    const emailsCollection  = req.app.locals.emailsCollection
    emailsCollection
        .insertOne( {email: req.body.email})
        .then( (result) => {
            if(result.insertedCount ==1) return res.json('success')
        })
        .catch((error) => {
            return res.json('Failure')
        })
    

})


router.post('/send', (req,res) => {
    
    const mail = require('../email')
    const contactMail  = req.app.locals.contactMail
    contactMail
        .insertOne( {
            email: req.body.email,
            message: req.body.message,
            name: req.body.name,
            subject: req.body.subject
        
        })
        .then( (result) => {
            if(result.insertedCount ==1) return res.json('Success')
        })
        .catch((error) => {
            return res.json('Failure')
        })

   
})

module.exports = router
