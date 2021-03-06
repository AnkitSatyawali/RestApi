const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const path = require('path');
const postRoutes = require('./routes/post');
const app = express();

mongoose.connect(config.database,{useNewUrlPaser: true})
.then(() => {
	console.log('Connected to database');
},
err => {
	console.log(err);
    console.log('Connection Failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/uploads',express.static('uploads'));
app.use('/',express.static(path.join(__dirname,'./../../index.html')));
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    	"Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    	"GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
app.use("/",postRoutes);
module.exports = app;