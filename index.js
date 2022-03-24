var express = require('express');
var app = express();

// const mongoose = require("mongoose");
var bodyParser = require('body-parser')
require('./config');
const bcrypt = require("bcrypt")

const User = require('./models/User');
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));
// View Engine Setup
app.set('view engine', 'ejs');
// View Engine Setup end
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(__dirname+"./public"))
const path=require("path")
//  app.use('/public', express.static(path.resolve(__dirname, './public')))
app.use(express.static(path.resolve(__dirname,'./public')))
// app.use('/update', express.static(path.resolve(__dirname,'./public/uploads')))


 const userRoute=require("./routes/userRoute")

app.use("/users",userRoute)
require("./nodemailer/nodemailer")


const server = app.listen(5000, () => console.log("server is running on port 5000"));
