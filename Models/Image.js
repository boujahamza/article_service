const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const imageSchema = new Schema({
    user_id :String ,
    img_url:String,
},{timestamps :true});

var image=mongoose.model('image',imageSchema);

module.exports=image;
