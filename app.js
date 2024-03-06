require('dotenv').config();
const express=require('express');
const expressLayouts=require('express-ejs-layouts')
const connectDB=require('./server/config/db')
const session=require('express-session');
const passport=require('passport');
const MongoStore=require('connect-mongo');
const methodOverride=require('method-override');

const app=express();
const port=5000 || process.env.PORT;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//connected to Database
connectDB();

//static files
app.use(express.static('public'));

//template engine
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//Routes
app.use('/',require('./server/routes/auth'));
app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/dashboard'));

//Handle 404
app.get('*',(req,res)=>{
 res.status(404).render('404')
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})