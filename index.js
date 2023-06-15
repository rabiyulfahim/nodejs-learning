var express = require('express');
var app = express();
var routers = require('./router/router.js');
// app.set('views', './views')
// app.set('view engine', 'ejs')
app.get('/', function(req, res){
   res.send("Hello world!");
});

//both index.js and things.js should be in same directory
app.use('/router', routers);

app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'))
app.use('/img', express.static(__dirname+'public/img'))
app.use('/js', express.static(__dirname+'public/js'))
app.use('/video', express.static(__dirname+'public/video'))

//Middleware 1

// //Middleware function to log request protocol
// app.use('/router', function(req, res, next){
//     console.log("A request for things received at " + Date.now());
//     next();
//  });
 
//  // Route handler that sends the response
// app.get('/router', function(req, res){
//     res.send('Things');
//  });

//  // Middleware 2

// //First middleware before response is sent
// app.use(function(req, res, next){
//     console.log("Start");
//     next();
//  });
 
//  //Route handler
//  app.get('/', function(req, res, next){
//     res.send("Middle");
//     next();
//  });
 
//  app.use('/', function(req, res){
//     console.log('End');
//  });

//third party middleware

var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

var cookieParser = require('cookie-parser');
app.use(cookieParser())

// app.get('/app', (req, res) => {res.render('index', {text:'This is EJS'})})
app.get('/api/courses', (req, res) => res.send([1,2,3]))

app.set('views', './views')
app.set('view engine', 'ejs')
app.get('/app', (req, res) => {res.render('index', {text:'This is EJS'})})
app.get('/about', (req,res) => {res.render('about', {text:'This is about page'})})

app.get('/image', (req, res) => {res.render('image', {text:'This is image page'})})
app.listen(3000);
