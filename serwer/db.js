module.exports = function(app){

const MongoClient = require('mongodb').MongoClient
MongoClient.connect(
        'mongodb+srv://admin:admin@cluster0.ih1fywf.mongodb.net/portfolio?retryWrites=true&w=majority',
        {useUnifiedTopology: true }
    ).then( (client) => {

    // console.log("Connected to Mongo Database")
    const db = client.db('portfolio')


    app.locals.db = db
    app.locals.emailsCollection = db.collection('emails')
    app.locals.contactMail = db.collection('contact') 
    app.locals.articlesCollection = db.collection('articles')//WŁASNE
    app.locals.categoriesCollection = db.collection('categories')//WŁASNE
    //db.collection('emails').createIndex( {"email":1}, {unique: true})
    //db.collection('contact').createIndex( {"email":1}, {unique: true})
    app.locals.portfolioCollection = db.collection('portfolio')
    }).catch( (error) =>
    { console.log("error")})

    

    

    
}