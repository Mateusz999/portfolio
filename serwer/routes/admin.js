const express = require("express");
const router = express.Router();
const pages_url = require("../settings");

router.get("/admin", (req, res) => {


    
        const db = req.app.locals.db
        db.collection('categories')
        .find()
        .toArray()
        .then( (result) => {
            res.render(pages_url + "/admin.ejs", {
                page: "admin",
                categories: result
              });
        
        })
        .catch((error) => console.log(error))

});

router.post('/article', (req,res) => {

    const articlesCollection = req.app.locals.articlesCollection
    const categoriesCollection = req.app.locals.categoriesCollection

    categoriesCollection
        .findOneAndUpdate(                  //funkcja wyszkująca i updatująca
            {name: req.body.category},
            {$inc: {number_of_posts: +1}}       //inkrementuje
        )
        .catch( () => {
            return res.json('Failure')
        })

    articlesCollection
    .insertOne( {
        title: req.body.title,
        created_at: req.body.created_at,
        image: req.body.image,
        category: req.body.category,
        descriprion: req.body.descriprion,
        long_description: req.body.long_description
    
    }) //bo przesyłamy wszystko, a nie poszczególne elementy
        //insertMany('req.body), ale pliki json muszą być w tablicy
        .then( (result) => {
            if(result.insertedCount ==1) {return res.json('Success')}
        })
        .catch( () => {
            return res.json('Failure')
        })

})

router.post('/portfolio', (req,res) => {

    const portfolioCollection = req.app.locals.portfolioCollection
    portfolioCollection
       // .insertOne(req.body)
       .insertMany(req.body)
       .then( (result) => {
        return res.json('Succes')
       })
       .catch( (error) => console.log(error))
})

router.get('/articles-list', async (req,res) => {

    const db = req.app.locals.db

    const categories =  await db.collection('categories')
        .find()
        .toArray()
        .catch((error) => console.log(error))

    db.collection('articles').aggregate([

        {
            $lookup: {
                from: 'categories', //szukamy z tabeli categories
                localField: 'category', //pola lokalnego pola z artykulów
                foreignField: 'name', //nazwa pola z categories
                as: 'category'
            }
        }
    ])
    .toArray()
    .then( (result) =>
    {
        res.render(pages_url + '/admin_articles_list.ejs',{
        page:'admin_articles_list',
        articles: result,
        categories: categories
    })
    
    })
    .catch( (error) => console.log(error))
})


router.get('/get-article/:id', (req,res) => {

    const db = req.app.locals.db
    var id = req.params.id
    const ObjectId = require('mongodb').ObjectID

    db.collection('articles')
        .findOne( {_id: ObjectId(id)})
        .then( (result) => {
            return res.json(result)
        })
        .catch( (error) => {
            return res.json('Failure')
        })
})


router.put('/article/:id', (req,res) => {

    const db = req.app.locals.db
    var id = req.params.id
    const ObjectId = require('mongodb').ObjectID

    db.collection('articles')
        .findOneAndUpdate(
            {_id: ObjectId(id)},
            {
                $set: {
                    title: req.body.title,
                    created_at: req.body.created_at,
                    image: req.body.image,
                    category: req.body.category,
                    description: req.body.description,
                    long_description: req.body.long_description,
                }
            }
        )
        .then((result) => {
            return res.json("Success")
        })
        .catch(() => {
            return res.json("Failure")
        })

})

router.delete('/delete-article',(req,res) =>{
    
    const db = req.app.locals.db
    const ObjectId = require('mongodb').ObjectID

    db.collection('categories')
    .findOneAndUpdate(
        {name: req.body.category},
        { $inc: {number_of_posts: -1} }
     )
        .catch( (error)=> {
            return res.json('Failure')
        })

        db.collection('articles')
        .deleteOne({_id: ObjectId(req.body.id)})
            .then( (result)=>{

            if(result.deletedCount ===0) {

                return res.json('No article to delete')
            }    
                return res.json('Success')    
        })
        .catch( ()=> {
            return res.json('Failure')
        })


   

})


module.exports = router;
