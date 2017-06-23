var crypto = require('crypto');
var User = require('../models/user.js');
var Post=require('../models/post.js');
var Question = require('../models/question');

module.exports=function(app){

    app.get('/', function(req,res){
        console.log("get dfdsf /");




        var user = req.session.user;
        if(!req.session.user){
            console.log("not login yetttt");
           return  res.render('index',{

                title:'知乎-与世界分享你的知识，经验和见解',
                user:null,
                error:null,
                success:null,
                questions:null
            });

        }else{
            console.log(" login already.");
            console.log("session.user is array ?: "+(req.session.user instanceof Array));
            console.log( "session.user.length: "+req.session.user.length);
            console.log( req.session.user[0].name);
            var subjects = req.session.user[0].subjects;
            var questions = [];
            for(var i=0,len=subjects.length;i<len;i++) {



                var fields = {
                    asker: 1,
                    title: 1,
                    subject: 1,
                    description: 1,
                    answers: 1,
                    time: 1
                };
                var options = {};

                (function(j){
                    var criteria = {
                        subject: subjects[j]
                    };//find condition
                    console.log('get / ,subject: '+criteria.subject);
                    Question.find(criteria, fields, options, function (error, result) {
                    if (error) {
                        console.log(" login already,no questions get: " + error);
                        req.flash('error', error);
                        return res.redirect('/');
                    }
                    console.log(" login already,show all the questions the user interested,questions:/n" + result);
                    console.log(result instanceof Array);
                    console.log(result.length);
                    /*
                     res.render('index',{
                     title:'知乎-与世界分享你的知识，经验和见解',
                     user:req.session.user[0],
                     questions:result
                     });
                     */
                    //add
                    questions.push.apply(questions, result);
                    console.log("herhehrhehhrehrhe ");
                    if(j==len-1){
                        console.log('questions.length: '+questions.length);
                        if(true){
                            res.render('index',{
                                title:'知乎-与世界分享你的知识，经验和见解',
                                user:req.session.user[0],
                                questions:questions
                            });
                        }
                    }
                });
                })(i);
            }

            /*
            User.find(criteria,fields,options,function (error,user) {
                if(error){
                    req.flash('error',error);
                }
                 res.render('index',{
                     title:'知乎-与世界分享你的知识，经验和见解',
                     user:user,
                     questions:questions,
                 });

            });*/


            /*
            User.get(req.session.user,function (err,user,questions) {
                if(err){
                    req.flash('error',err);

                }


                res.render('index',{
                    title:'知乎-与世界分享你的知识，经验和见解',
                    user:user,
                    questions:questions,

                });
            });*/
        }

    });

    app.post('/', function(req,res){
        console.log("post ");
        /*if(req.body['password-repeat']!=req.body['password']){
         req.flash('error','两次输入的口令不一致');
         return res.redirect('/reg');
         }*/
        var md5 = crypto.createHash('md5');
        var password=md5.update(req.body.password).digest('base64');

        var newUser = {
            loginCount:0,
            name:req.body.username,
            number:req.body.number,
            password:password,
            subjects:["society"]
        };
        console.log("post /");
        console.log(req.body.username);
        console.log(newUser.number);
        console.log(newUser.password);
        console.log(newUser.subjects);
        if(req.body.regOrLogin=="reg"){//register
            var criteria = {
                number:req.body.number
            }
            var fields = {
                name:1,
                number:1,
                password:1,
                subjects:1
            };
            console.log('register / ,criteria.number:'+criteria.number);
            var options = {};
            User.findOne(criteria,fields,options,function(err,user){
                if(user){
                    if(user.number==criteria.number)
                        err='this number already exists,please use another number to register';
                }


                console.log('User find---1');
                if(err){
                    console.log(err);
                    return res.render('index',{
                        title:'知乎-与世界分享你的知识，经验和见解',
                        user:null,
                        error:err,
                        success:null
                    });
                }
                console.log('User find---2');
                User.save(newUser,function(err){
                    if(err){
                        console.log(err);
                        req.flash('error',err);
                        return res.redirect('/');

                    }
                    req.session.user = null;
                    console.log('register success');
                    req.flash('success','注册成功');
                    res.redirect('/');
                });
            });

        }else{ // post login
            var criteria = {
                number:req.body.number,
                //password:password
            }
            var fields = {
                name:1,
                number:1,
                password:1,
                subjects:1
            };
            console.log('post login / ,criteria:'+criteria.number);
            var options = {};
            User.find(criteria,fields,options,function(err,user){
                if(!user){
                    console.log("login 用户不存在");
                    req.flash('error','用户不存在');
                    return res.redirect('/login');
                }
                if(user.password!=criteria.password){
                    console.log("login 用户口令错误");
                    req.flash('error','用户口令错误');
                    return res.redirect('/');
                }
                req.session.user=user;
                console.log("login ok session: "+req.session.user);
                console.log('login success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!,redirect to /');
                res.cookie("myCookie",{account:"myCookie"},{maxAge:0});
                req.flash('success','登录成功');
                res.redirect('/');
                /*
                res.render('index',{
                    title:'知乎-与世界分享你的知识，经验和见解',
                    error:null,
                    success:null,
                    user:req.session.user,

                });
                */
            });
        }


    });
    app.get('/comment',function (req,res) {
        var question = req.session.question;

        var user = req.session.user;
        var commentContent = req.query.commentContent;
        var whichAnswer = req.query.whichAnswer;
        var commentor = user[0].name;
        var answers = question.answers;
        var answer;
        for( var answer in answers){
            if(answers[answer].replier==whichAnswer){
                answer = answers[answer];
                break;
            }
        }
        var comments = answer.comments;

      //  var replier = question.answers.replier;

        console.log('get /comment content:',commentContent);
        console.log('get /comment commentor',commentor);
        console.log('get /comment question.title',question.title);
     //   console.log('get /comment answers.replier',replier);
        console.log('get /comment whichAnswer',whichAnswer);

        var comment = {
            commentor:commentor,
            commentContent:commentContent
        }
        console.log('before,comments: '+comments);
        comments.push(comment);
         console.log('after,comments: '+comments);
        var answer
        //update the comment to the question on the specific title and replier
        var conditions = {
            'title': question.title,

        }
        var update = {$set:{'answers':answers}};
        var options = {upsert:true};
        Question.update(conditions,update,options,function(error){
            if(error){
                console.log('update error: '+error);
                req.flash('error',error);

            }
         //   var url = '/questionDetails/q/'+question.title;
         //   res.redirect("/questionDetails/q/"+question.title);
            console.log('add comment to db success');
            res.json({'success':'评论成功'});
        });
    });

    app.get('/search',function (req,res) {
        var searchContent = req.query.searchContent;

        var criteria = {
            'text':{search:searchContent}

        };//find condition
        var fields = {
            asker:1,
            title: 1,
            subject:1,
            description :1,
            answers:1,
            time:1
        };
        var options = {};

        console.log('get /search: '+searchContent);


        Question.find(criteria,fields,options,function (error,result) {
            if(error){
                console.log(" get /search: "+error);
                req.flash('error',error);
                return res.redirect('/');
            }
            console.log(" /search ,questions: "+result);
            console.log( result instanceof Array);
            console.log( result.length);
            req.session.question = null;
            req.session.question = result[0];
            res.render('question',{
                title:'知乎-与世界分享你的知识，经验和见解',
                user:req.session.user[0],
                question:result
            });
        });
    });


    app.post('/answer',function(req,res){
        var question = req.session.question;
        var user = req.session.user;


     //   var oldAnswers = question.answers;
        var newAnswer = {
            replier:user[0].name,
            content:req.body.answer,
            comments:[]
        };
        console.log('newAnswer: '+newAnswer);
    //    oldAnswers.push(newAnswer);

     //   var answer = req.body.answer;
      //  var answers = oldAnswers.push(answer);
        var conditions = {
            title:question.title
        }


        console.log('post /answer: '+req.body.answer);
        var update = {$push:{answers:newAnswer}};
        //  var update = {$set:{answers:oldAnswers}};

        var options = {upsert:true};
        Question.update(conditions,update,options,function(error){
            if(error){
                console.log('update error: '+error);
                req.flash('error',error);

            }
            var url = '/questionDetails/q/'+question.title;
            res.redirect("/questionDetails/q/"+question.title);
        });
    });

    app.get('/questionDetails/q/:title',function(req,res){


        console.log('user.name: '+req.session.user[0].name);
        console.log('******************ffffffffffff*****************8');
        console.log('title= '+req.params.title);
        var criteria = {
             title:req.params.title,
         //   title:'你在哪里'

        };//find condition
        var fields = {
            asker:1,
            title: 1,
            subject:1,
            description :1,
            answers:1,
            time:1
        };
        var options = {};

        console.log('get /questionDetails/q/:title show questions ,title: '+criteria.title);
        console.log('type of req.params.title: '+( req.params.title));

        Question.find(criteria,fields,options,function (error,result) {
            if(error){
                console.log(" get /q/:title,no questions get: "+error);
                req.flash('error',error);
                return res.redirect('/');
            }
            console.log(" /questionDetails/q/:title,questions: "+result);
            console.log( result instanceof Array);
            console.log( result.length);
            req.session.question = null;
            req.session.question = result[0];
            res.render('question',{
                title:'知乎-与世界分享你的知识，经验和见解',
                user:req.session.user[0],
                question:result[0]
            });
        });
    });
    app.get('/u/:user', function(req,res){
       User.get(req.params.user,function (err,user) {
           if(!user){
               req.flash('error','用户不存在');
               return res.redirect('/');
           }
           Post.get(user.name,function (err,posts) {
              if(err){
                  req.flash('error',err);
                  return res.redirect('/');
              }
              res.render('user',{
                  title:user.name,
                  posts:posts
              });
           });
       })

    });


    app.get('/reg',function(req,res){
        console.log("get /reg");
        res.render("reg",{title:'用户注册'});

    });
    app.post('/question',function(req,res){
        console.log(req.params.user);

        var newQuestion ={
            asker:req.session.user[0].name,
            title:req.body.questionTitle,
            subject:req.body.questionSubject,
            description:req.body.questionDescription,
            answers: [],
            time:new Date()
        };
        console.log("post /question");
        console.log(newQuestion.asker);
        console.log(req.body.questionTitle);
        console.log(req.body.questionSubject);
        console.log(req.body.questionDescription);

        Question.save(newQuestion,function(error){
            if(error){

                console.log("save question to server failed:"+error);
                req.flash('error',error);
                return res.redirect('/');
            }
            console.log('Question.save ok!!');
            req.flash("success","问题提交成功");
            res.redirect('/');
        });
    });

    app.get('/login', function(req,res){
        console.log("get /login");
        res.render("login",{title:'用户登录'});

    });
    app.post('/login',checkNotLogin);
    app.post('/login',function(req,res){
        console.log("post /login");
        var md5=crypto.createHash('md5');
        var password=md5.update(req.body.password).digest('base64');

        User.get(req.body.username,function(err,user){
            if(!user){
                req.flash('error','用户不存在');
                return res.redirect('/login');
            }
            if(user.password!=password){
                req.flash('error','用户口令错误');
                return res.redirect('/login');
            }
            req.session.user=user;
            var loginCount = ++req.session.user.loginCount;
            //update login count
            User.update({name:user.name},{$set:{loginCount:loginCount}},{upsert:false},function (error) {
                if(error){
                    req.flash('error',error);
                }
            });

            req.flash('success','登录成功');
            res.redirect('/');
        });

    });
    app.get('/logout',checkLogin);
    app.get('/logout', function(req,res){
        console.log("get /Logoutttt");
        req.session.user = null;
        delete req.session.user;
        req.flash('success','登出成功');
        res.redirect('/');

    });

    app.post('/post',checkLogin);
    app.post('/post',function (req,res) {
        var currentUser = req.session.user;
        var post=new Post(currentUser.name,req.body.post);

        post.save(function (err) {
            if(err){
                console.log("post contents err");
                req.flash('error',err);
                return res.redirect('/');
            }
            req.flash('success','发表成功');
            res.redirect('/u/'+currentUser.name);
        });
    });

};

function checkLogin(req,res,next){
    if(!req.session.user){
        console.log("checkLogin: not login");
        req.flash('error',"未登录");
        return res.redirect('/');

    }
    next();
}
function checkNotLogin(req,res,next){
    if(req.session.user){
        req.flash('error','已经登录');
        return res.redirect('/');
    }
    next();
}
