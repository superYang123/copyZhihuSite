/**
 * Created by Administrator on 2017/5/27.
 */
/*
var Settings = require('./Settings');
var mongodb = require('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;

module.exports = new Db(Settings.db,new Server(Settings.host,27017,{}));//Connection.DEFAULT_PORT*/

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/zhihu",{
    server:{ socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }},

    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
});
var db = mongoose.connection;

//var db = mongoose.createConnection("mongodb://localhost/microblog");
var UserSchema = new mongoose.Schema({
    loginCount:Number,
     name:String,
     number: String,
     password: String,
     subjects :[String]
});

var UserModel = db.model('users',UserSchema);

var QuestionSchema = new mongoose.Schema({
    asker:String,
    title: String,
    subject:String,
    description :String,
    answers:[{
               replier:String,
               content:String,
               comments:[{
                        commentor:String,
                        commentContent:String
               }]
            }],
    time:Date
});
QuestionSchema.index({title:'text'});
var QuestionModel = db.model('questions',QuestionSchema);


module.exports.UserModel =  UserModel;
module.exports.QuestionModel =  QuestionModel;
module.exports.db = db;

