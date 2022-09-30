const express = require('express')
const router = express.Router()

const pages_url = require('../settings.js')
/* router.get('/', async (req, res) => {

    const db = req.app.locals.db
    let articles, categories

    articles = await db.collection('articles')
    .find()
    .toArray()
    .catch( (error) => console.log("error") )


    categories = await db.collection('categories')
    .find()
    .toArray()
    .catch( (error) => console.log("error") )

  //  console.log(articles)
    res.render(pages_url+'/blog.ejs',
    {   articles: articles, 
        categories: categories
    })
}) */
router.get('/',  (req, res) => {

    const db = req.app.locals.db
    Promise.all([

        db.collection('articles')
        .find()
        .toArray()
        .catch( (error) => console.log("error") ),
    
    
        db.collection('categories')
        .find()
        .toArray()
        .catch( (error) => console.log("error") )
    
    ]).then( (result) => {

        res.render(pages_url+'/blog.ejs',
        {   articles: result[0], 
            categories: result[1],
            page: 'blog'
        })

    }).catch( (error) => console.log(error))


  //  console.log(articles)

})


router.get('/details/:id', (req, res) => {


    const db = req.app.locals.db
    let id = req.params.id
    const ObjectId = require('mongodb').ObjectID

    Promise.all([
        db.collection('categories')
        .find()
        .toArray()
        .catch( (error) => console.log(error)),

        db.collection('articles')
        .findOne( {_id: ObjectId(id)})
        .catch( (error) => console.log(error))
        

    ]).then( (result) =>{

        res.render(pages_url+'/blog_details.ejs',{
            categories: result[0],
            articles: result[1],
            page:'blog_details'
        })
    }).catch( (error) => console.log(error))


})

module.exports = router
