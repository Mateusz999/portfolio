const express = require('express')
const router = express.Router()

const pages_url = require('../settings.js')

router.get('/', (req,res) => {

    const db = req.app.locals.db
    db.collection('portfolio')
    .find()
    .toArray()
    .then((result) => {
        console.log(result.length)

        res.render(pages_url + '/index.ejs', {
            portfolio: result,
            page: 'main'
        
            
        })
        
    })
    .catch((error) => console.log(error))


})
router.get('/about', (req, res) => {

    res.render(pages_url+'/about.ejs', {page: 'about'})// gdy używamy ejs 
        // natomiast gdy chcemy użyc .html to res.sendFile
})
router.get('/services', (req, res) => {

    res.render(pages_url+'/services.ejs',{page: 'services'})// gdy używamy ejs 
        // natomiast gdy chcemy użyc .html to res.sendFile
})
router.get('/portfolio', (req, res) => {

    res.render(pages_url+'/portfolio.ejs',{page: 'portfolio'})
})
router.get('/category/:category', (req, res) => {

    const db = req.app.locals.db
    let category = req.params.category

    Promise.all([
        db.collection('categories')
            .find()
            .toArray()
            .catch((error) => console.log(error)),

        db.collection('articles')
            .find( {category: category})
            .toArray()
            .catch((error) => console.log(error))
    ]).then( (result) =>{

        res.render(pages_url+'/blog.ejs', {
                categories: result[0],
                articles: result[1],
                page: 'blog'
            })
    }).catch( (error) => console.log(error))
    
})





module.exports = router