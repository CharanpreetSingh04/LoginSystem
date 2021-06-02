const express=require("express");
const mysql=require("mysql");
const dotenv=require("dotenv");
const cookieParser= require('cookie-parser');
const path=require('path');
dotenv.config( { path: './.env'});
const app=express();
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});


const publicDirectory=path.join(__dirname, './public');

app.use(express.static(publicDirectory));

//parse url encoded bodies (as sent b html forms)
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');
db.connect( (error) =>{
    if(error){
        console.log(error);
    }else{
        console.log("Database connected...");
    }
})
//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))
app.listen(5000, () => {
    console.log("Server Started on Port 5000");
});