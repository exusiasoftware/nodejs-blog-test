const path = require('path')


require('dotenv').config(); //set env dotenv


const expressEdge = require('express-edge') //renders web pages

const express = require('express')  //web server 

const mongoose = require('mongoose') //mongo connection

const bodyParser = require('body-parser')
const expressSession = require('express-session') //creates cookies 
const connectMongo = require('connect-mongo') //keeps user state in mongo 
const connectFlash = require('connect-flash')

const edge = require('edge.js')



const storePost  = require('./middleware/storePost')


const createPostController = require('./controllers/createPost')
const logoutController = require('./controllers/logout')
const storePostController = require('./controllers/storePost');
const homePageController = require('./controllers/homePage')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const getPostController = require('./controllers/getPost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')




const Post = require('./database/models/Post')
// const fileUpload = require('express-fileupload')








const app = new express()

const mongoStore = connectMongo(expressSession);

mongoose.connect(process.env.DB_URI)

// app.use(fileUpload)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(connectFlash())
app.use(expressEdge)
app.use(expressSession({

     secret: process.env.EXPRESS_SESSION_KEY,
     store: new mongoStore({
           mongooseConnection: mongoose.connection
     })

}))
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()


})




 app.get('/posts/new', createPostController)


app.use('/posts/store', auth,storePost, storePostController)

app.get('/auth/register',redirectIfAuthenticated, createUserController);
app.get('/auth/login',redirectIfAuthenticated, loginController);
app.post('/users/login',redirectIfAuthenticated, loginUserController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);

app.set('views', `${__dirname}/views`);


app.get('/', homePageController);


app.get('/auth/logout',auth, logoutController)

app.get('/post/:id', getPostController)




 app.post('/posts/store', storePostController);


 app.use((req, res) => res.render('not-found'));








app.listen(process.env.PORT, () => {

    console.log(`App listening on port ${process.env.PORT}`)

}) 