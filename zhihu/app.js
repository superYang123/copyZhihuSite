var express = require('express');
var routes=require("./routes/index");
//var user=require("./routes/users");
var connect = require('connect');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash=require("connect-flash");

var SessionStore=require("session-mongoose");

var http=require("http");
var ejs=require("ejs");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var layouts= require('express-ejs-layouts');
var index = require('./routes/index');
var Settings = require('./models/Settings');

//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
//设置布局模板
app.use(layouts);
app.use(flash());

/*
app.dynamicHelpers({
    user:function (req,res) {
        return req.session.user;
    },
    error:function (req,res){
        var err=req.flash('error');
        if(err.length)
            return err;
        else
            return null;
    },
    success:function (req,res) {
        var succ=req.flash('success');
        if(succ.length)
            return succ;
        else
            return null;
    }

});
*/
/*
app.get('/', routes.index);
app.get('/u/:user',routes.user);
app.post('/post',routes.post);
app.get('/reg',routes.reg);
app.post('/reg',routes.doReg);
app.get('/login',routes.login);
app.post('/login',routes.doLogin);
app.get('/logout',routes.logout);

// error handler
 */

app.use(session({
    secret:Settings.cookieSecret,
    store:new MongoStore({
        url:'mongodb://localhost/microblog',
        autoRemove:'native'
    })
}));

app.use(function( req, res, next) {
    console.log("ggggggggggggggggggggggggggggggggg,res.locals.user:"+res.locals.user);
    // set locals, only providing error in development
    res.locals.error =   req.flash('error').length?req.flash('error'):null;
    res.locals.success = req.flash('success').length?req.flash('success'):null;
     res.locals.user=req.session.user;

    next();
    // render the error page
    //res.status(err.status || 500);
    //res.render('error');
});

//actually call app.get('/',function(){}) app.post(route,func) app.get() .etc;
routes(app);


/*
app.get("/movie/add",movie.movieAdd);
app.post("/movie/add",movie.doMovieAdd);
app.get("/movie/:name",movie.movieAdd);*/
//app.post("/movie/json/:name",movie.movieJSON);
// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

//app.route("/users").get(function(req,res,next){})
//   .post(function(req,res,next){});


//app.use('/users', users);
//app.use("/user",require("./routes/users").user);
//app.use("/admin",require("./routes/admin").admin);
//app.use("/",require("/routes"));




module.exports = app;
