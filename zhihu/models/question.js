/**
 * Created by Administrator on 2017/5/31.
 */

/**
 * Created by Administrator on 2017/5/27.
 */

var QuestionModel = require('./db').QuestionModel;
var db = require('./db').db;

var QuestionCollection = {
    save:save,
    update:update,
    remove:remove,
    find:find

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
    QuestionModel.create(question,function (error){
        console.log('Question.Create--begin');
        console.log('Question.Create error: '+error);
        if(error){
            callback(error);
        }else{
            callback(null);
        }
    })  ;
  //  db.close();

}
function update(conditions,update,options,callback){
    QuestionModel.update(conditions,update,options,function (error) {
        if(error){
            callback(error);
        }else{
            callback(null);
        }
    });
  //  db.close();

}
function find(criteria,fields,options,callback){
    QuestionModel.find(criteria,fields,options,function (error,result) {
        if(result){
            callback(null,result);
        }else{
            callback(error,null);
        }

    }) ;
 //   db.close();
}

function remove(conditions ,callback){
    QuestionModel.find(conditions,function (error) {
        if(error){
            callback(error);
        }else{
            callback(null);
        }
    });
 //   db.close();
}
module.exports = QuestionCollection;

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

