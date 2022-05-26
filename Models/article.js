const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const articleSchema = new Schema({
    title :String,
    image_url : String,
    description :String ,
    content:String,
    author_id : String ,
    likes : String ,
    comments :Array
},{timestamps :true});

var article=mongoose.model('article',articleSchema);

module.exports=article;
