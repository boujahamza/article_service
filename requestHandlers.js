const articleDb = require("./Models/article.js");
const ImagesDb = require("./Models/Image.js");
const EventDb = require("./Models/Events.js");



module.exports.getArticles = (req, res) => {
    articleDb.find({})
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(articles);
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
}
module.exports.getArticle = (req, res) => {
    const articleId = req.params.article_id;
    articleDb.findOne({
        _id: articleId
    }).then((article) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(article);
        res.end();
    }, (err) => console.log(err))
        .catch((err) => console.log(err));
}
module.exports.addArticle = (req, res) => {
    req.body.author_id = JSON.parse(req.headers["user"]).user_id;
    articleDb.create(req.body)
        .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
}
module.exports.getUserArticles = (req, res) => {
    const userid = req.params.user_id;
    articleDb.find({ author_id: userid })
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(articles)
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
}
//// comments 
module.exports.addArticleComment = (req, res) => {
    req.body.author_id = JSON.parse(req.headers["user"]).user_id;
    req.body.author_name = JSON.parse(req.headers["user"]).username;
    let articleid = req.params.article_id;
    articleDb.findOneAndUpdate(
        { _id: articleid },
        { $push: { comments: req.body } })
        .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
}


// images 
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

var multipleUpload = multer({ storage: storage }).array('files');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream } = require('./s3');


module.exports.addImages = (req, res) => {
    let user_id = req.body.user_id;
    if (!user_id) user_id = "1";
    multipleUpload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        let img = []
        req.files.forEach(async (file) => {
            const result = await uploadFile(file);

            await unlinkFile(file.path);
            img.push(result.Location);
            if (img.length == req.files.length) {
                let l = [];
                img.forEach(i => {
                    l.push({
                        user_id: user_id,
                        img_url: i
                    })
                })
                ImagesDb.insertMany(l)
                    .then(() => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            path: img
                        })
                        res.end();
                    }, (err) => console.log(err))
                    .catch((err) => console.log(err));

            }
        });

    })
}
module.exports.getImage = (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)

    readStream.pipe(res)
}
module.exports.getImages = (req, res) => {
    ImagesDb.find()
        .then((images) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(images)
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
}

/// Events
module.exports.getEvents = (req, res) => {
    const user_id = req.params.user_id;
    EventDb.find()
        .then((events) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            result = [];
            events.forEach(event => {
                let flag=0;
                event.contestants.forEach(contestant => {
                    if (contestant.user_id== user_id) {
                        result.push({
                            event_id :event._id,
                            poster_url: event.poster_url,
                            event_title: event.title,
                            isregistred:true,
                            nbr_registers:event.contestants.length,
                        });
                        flag=1;
                    }
                })
                if(flag==0){
                    result.push({
                        event_id:event._id,
                        poster_url: event.poster_url,
                        event_title: event.title,
                        isregistred:false,
                        nbr_registers:event.contestants.length,
                    });
                }
            })
            res.json(result);
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
}
module.exports.addEvent = (req, res) => {
    EventDb.create(req.body)
        .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));
}
module.exports.register_to_event = (req, res) => {
    let event_id = req.params.event_id;
    EventDb.findOneAndUpdate(
        { _id: event_id },
        { $push: { contestants: req.body } })
        .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end();
        }, (err) => console.log(err))
        .catch((err) => console.log(err));

}
