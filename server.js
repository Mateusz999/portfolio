// console.log('Node is running!')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(express.static('public')) //dostęp do folderu public, gdzie jesst css, js , czyli pliki statyczne
app.set('view enginge','ejs') 
app.set('views',__dirname + '/views')
app.use(bodyParser.json()) //for content-type: application/json request
app.use(bodyParser.urlencoded( {extended: true})) //dane podane w url
require('./serwer/db')(app)


app.use('/portfolio', require('./serwer/routes/portfolio'))
app.use('/contact', require('./serwer/routes/contact'))
app.use('/blog', require('./serwer/routes/blog'))
app.use('/admin-secret-key', require('./serwer/routes/admin'))
app.use('/email', require('./serwer/routes/email'))
app.use('/', require('./serwer/routes/index'))

app.listen(3000, function() {

    console.log('Listening on PORT 3000')

})
