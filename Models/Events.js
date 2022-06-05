const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const eventSchema = new Schema({
    poster_url:String,
    event_title:String,
    contestants:Array,
    contestant_id:Array,
    date:Date,
    tags:Array,
},{timestamps :true});

var event=mongoose.model('event',eventSchema);

module.exports=event;
