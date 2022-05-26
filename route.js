const express = require('express');
const ArticleRouter = express.Router();
const ImageRouter = express.Router();
const EventRouter = express.Router();

const requestHandlers = require("./requestHandlers.js");
//const User = require("./model.js");


ArticleRouter
    .get('/', (req, res) => { requestHandlers.getArticles(req, res) })
    .get('/:article_id', (req, res) => { requestHandlers.getArticle(req, res) })
    .get('/:user_id/article',(req, res) => { requestHandlers.getUserArticles(req, res) })
    .post("/", (req, res) => { requestHandlers.addArticle(req, res) })
    .get("/:article_id/comment", (req, res) => { requestHandlers.getArticleComments(req, res) })
    .post("/:article_id/comment", (req, res) => { requestHandlers.addArticleComment(req, res) })

ImageRouter
    .get('/:key', (req, res) => { requestHandlers.getImage(req, res) })
    .get('/',(req, res) => { console.log("eehigelgh");requestHandlers.getImages(req, res) })
    .post("/",(req, res) => { requestHandlers.addImages(req, res) })

EventRouter
.get('/', (req, res) => { requestHandlers.getEvents(req, res) })
.post('/', (req, res) => { requestHandlers.addEvent(req, res) })


module.exports= {
    ArticleRouter,
    ImageRouter,
    EventRouter,
}



