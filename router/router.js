var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on things.');
});
router.post('/', function(req, res){
   res.send('POST route on things.');
});

router.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
 });

router.get('/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });
//export this router to use in our index.js


router.get('/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
 });

//Other routes here
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });

// router.set('views', '../views')
// router.set('view engine', 'ejs')

module.exports = router;
