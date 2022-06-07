const express = require('express');
const ArticleRouter = express.Router();
const ImageRouter = express.Router();
const EventRouter = express.Router();

const requestHandlers = require("./requestHandlers.js");
//const User = require("./model.js");


ArticleRouter
    .post('/feed', (req, res) => { requestHandlers.generateFeed(req, res)})
    .get('/count', (req, res) => { requestHandlers.countArticles(req, res)})
    .get('/', (req, res) => { requestHandlers.getArticles(req, res) })
    .get('/:article_id', (req, res) => { requestHandlers.getArticle(req, res) })
    .get('/:user_id/article',(req, res) => { requestHandlers.getUserArticles(req, res) })
    .post("/", (req, res) => { requestHandlers.addArticle(req, res) })
    .get("/:article_id/comment", (req, res) => { requestHandlers.getArticleComments(req, res) })
    .post("/:article_id/comment", (req, res) => { requestHandlers.addArticleComment(req, res) })

ImageRouter
    .get('/:key', (req, res) => { requestHandlers.getImage(req, res) })
    .get('/',(req, res) => { requestHandlers.getImages(req, res) })
    .post("/",(req, res) => { requestHandlers.addImages(req, res) })

EventRouter
.get('/',(req,res)=>{requestHandlers.get_eventsByTag(req,res)})
.get('/count', (req, res) => { requestHandlers.countEvents(req, res)})
.get('/:user_id', (req, res) => { requestHandlers.getEvents(req, res) })
.post('/', (req, res) => { requestHandlers.addEvent(req, res) })
.post('/:event_id', (req, res) => { requestHandlers.register_to_event(req, res) })
.delete("/:event_id",(req, res) => { requestHandlers.delete_event(req, res) })
.put("/:event_id",(req, res) => { requestHandlers.cancelRegistration_to_event(req, res) })


module.exports= {
    ArticleRouter,
    ImageRouter,
    EventRouter,
}



