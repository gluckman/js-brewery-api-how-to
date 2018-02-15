var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 36364);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/tools',function(req,res){
  res.render('tools');
});

app.get('/first',function(req,res){
  res.render('first');
});

app.get('/tools',function(req,res){
  res.render('tools');
});

function randomMe(){
	var randomNum = Math.random().toString();
	var displayStuff = {};
	displayStuff.randomNum = randomNum;
	return displayStuff;
}

app.get('/random', function(req, res){
	res.render('random', randomMe());
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
