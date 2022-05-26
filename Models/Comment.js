const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const commentSchema = new Schema({
    author_id :String ,
    comment:String,
    author_name:String,
},{timestamps :true});

var comment=mongoose.model('comment',commentSchema);

module.exports=comment;
