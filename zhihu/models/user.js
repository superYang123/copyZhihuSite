/**
 * Created by Administrator on 2017/5/27.
 */

/**
 * Created by Administrator on 2017/5/31.
 */

/**
 * Created by Administrator on 2017/5/27.
 */

var UserModel = require('./db').UserModel;
var db = require('./db').db;

var UserCollection = {
    save:save,
    update:update,
    remove:remove,
    find:find,
    findOne:findOne

};
function save(question,callback){
    /*
     var UserEntity = new QuestionModel(question);
     userEntity.save(function (err,doc) {
     if(doc){
     callback(err,doc);
     }else{
     callback(err,null);
     }

     });
     */
    UserModel.create(question,function (error){
        if(error){
            callback(error);
        }else{
            callback(null);
        }
    })  ;
   // db.close();

}
function update(conditions,update,options,callback){
    UserModel.update(conditions,update,options,function (error) {
        if(error){
            callback(error);
        }else{
            callback(null);
        }
    });
  //  db.close();

}
function findOne(criteria,fields,options,callback) {
    UserModel.findOne(criteria,fields,options,function (error,result) {
        console.log("User.findone ok");
        console.log("User.findone result: "+result);
        console.log("User.findone error: "+error);
        if(error){
            console.log("User.findone failed ,result: "+result);
            console.log("User.findone failed ,error: "+error);
        }
        if(result){
            console.log("User.findone ok,result: "+result);
            callback(null,result);
        }else{
            console.log("User.findone error,error: "+error);
            console.log("User.findone ok,error"+error);
            callback(error,null);
        }

    }) ;
}
function find(criteria,fields,options,callback){
    console.log("User.find,criteria: "+criteria.number);

    UserModel.find(criteria,fields,options,function (error,result) {
        console.log("User.find ok");
        console.log("User.find failed ,result: "+result);
        console.log("User.find failed ,error: "+error);
        if(error){
            console.log("User.find failed ,result: "+result);
            console.log("User.find failed ,error: "+error);
        }
        if(result.length){
            console.log("User.find ok,result: "+result);
            callback(null,result);
        }else{
            console.log("User.find error,error: "+error);
            console.log("User.find ok,error"+error);
            callback(error,null);
        }

    }) ;
  //  db.close();
}

function remove(conditions ,callback){
    UserModel.find(conditions,function (error) {
        if(error){
            callback(error);
        }else{
            callback(null);
        }
    });
 //   db.close();
}
module.exports = UserCollection;

/*
 var db = require('./db');

 function Question(question){
 this.asker = question.asker;
 this.title=question.title;
 this.subject=question.subject;
 this.description=question.description;
 this.answers=question.answers;
 this.time = question.time

 }
 module.exports = Question;
 Question.prototype.save=function save(callback) {
 var question = {
 asker: this.asker,
 title: this.title,
 subject:this.subject,
 description:this.description,
 number:this.answers,
 time:this.time
 };
 mongodb.open(function (err, db) {
 if (err) {
 return callback(err);
 }
 db.collection('questions', function (err, collection) {
 if (err) {
 mongodb.close();
 return callback(err);
 }
 collection.ensureIndex('title', {unique: true});
 collection.insert(question, {safe: true}, function (err, doc) {
 mongodb.close();
 console.log("save question success!!!!!!!!!!!!");
 callback(err, doc);
 });
 });
 });

 };
 Question.get = function get(title,callback){
 mongodb.open(function(err,db){
 if(err){
 console.log("question1 get error");
 return callback(err);
 }
 db.collection("questions",function (err,collection) {

 if(err){
 mongodb.close();
 console.log("question1 collection error");
 return callback(err);
 }
 collection.findOne({title:title},function (err,doc) {
 mongodb.close();
 if(err){
 return callback(err);
 }
 var question = new Question(doc);
 callback(err,question);

 });
 });

 });
 };

 Question.getQuestions = function getQuestions(user,callback){
 console.log("question get begin ");
 mongodb.open(function(err,db){
 console.log("question get ");
 if(err){
 console.log("question get error");
 return callback(err);
 }
 console.log("question get ---1");
 db.collection('questions',function(err,collection){
 if(err){
 console.log("question get ---2");
 mongodb.close();
 console.log("question collection error");
 return callback(err);
 }
 console.log("question get ---3");
 var subjects = ["subject","psycho"];
 var questions = [];
 var query={};
 console.log("collection:"+ collection);

 //for(var subject in subjects)
 {
 query.subject = "society";
 collection.findOne({subject:"society"},function (err,doc) {
 mongodb.close();
 if(doc){
 questions.push(doc);
 console.log("questions:"+doc.asker);
 callback(err,user,questions);
 }
 else{
 callback(err,null);
 }

 });
 collection.find(query).sort({time:-1}).toArray(function (err, docs) {

 if(err){
 console.log("question get ---4");
 callback(err,null);

 }else {
 console.log("docs:"+docs);
 docs.forEach(function (doc, index) {


 questions.push(new Question(doc));
 });
 }

 });

 }
 mongodb.close();
 console.log(questions);
 console.log("question get ---7");



 });
 });

 };
 */



/*
var mongodb = require('./db');
var Question = require('./question');
function User(user){
    this.name=user.name;
    this.number=user.number;
    this.password=user.password;
    this.subjects = user.subjects;
}
module.exports = User;
User.prototype.save=function save(callback) {
    var user = {
        name: this.name,
        number:this.number,
        password: this.password,
        subjects: this.subjects,
    };
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex({name:1}, {unique: true});
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                if(err){
                    console.log("save user to server failed");
                }
                console.log("user: "+user);
                callback(err, user);
            });
        });
    });

};
    User.get = function get(user ,callback){
        console.log("User getttt");
            mongodb.open(function(err,db){

            if(err){
                console.log("User get error");
                return callback(err);
            }
            db.collection('users',function(err,collection){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                collection.findOne({name:user.name},function(err,doc){
                    mongodb.close();
                    if(doc){
                        var user = new User(doc);
                        Question.getQuestions(user,function (err,questions) {
                            if(err){
                                console.log("user get questions err ");
                                callback(err,user,null);
                            }else{
                                callback(err,user,questions);
                            }

                        });


                    }else{
                        callback(err,null);
                    }
                });
            });
        });

    };
    */
