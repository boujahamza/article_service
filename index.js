const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const router = require('./route.js');
const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname + "/uploads")));

app.use(cors());

const bodyparser = require('body-parser')
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

//serving public file
app.use(express.static(__dirname));
app.set('view engine', 'ejs');
//
app.use('/article',router.ArticleRouter);
app.use('/images',router.ImageRouter);
app.use('/events',router.EventRouter);


port = process.env.PORT || 3000;

//upload image 

server.listen(port, () => {
    console.log("listening on port" + port);
}); 

//data base

const mongoose = require('mongoose');
const url = process.env.MONGO_URI;
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to the data base server");
}, (err) => { console.log(err); });
