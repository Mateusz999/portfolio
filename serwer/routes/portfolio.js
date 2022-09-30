const express = require('express')
const router = express.Router()
const pages_url = require('../settings.js')


router.get('/', (req, res) => {

    const db = req.app.locals.db
    db.collection('portfolio')
    .find()
    .toArray()
    .then((result) => {
        console.log(result.length)

        res.render(pages_url + '/portfolio.ejs', {
            portfolio: result,
            page: 'portfolio'
        
            
        })
        
    })
    .catch((error) => console.log(error))

})


router.get('/details/:id', (req, res) => {
    

    const db = req.app.locals.db
    let id = req.params.id
    const ObjectId = require('mongodb').ObjectID

    db.collection('portfolio')
        .findOne( { _id: ObjectId(id) } )
        .then( (result) => {
            res.render(pages_url+ '/portfolio_details.ejs',{
                portfolio_detail: result,
                page: 'portfolio_details'
            })
        }).catch((error) => {
            console.log("error")
        })


})



module.exports = router