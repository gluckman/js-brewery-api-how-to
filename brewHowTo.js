var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var credentials = require('./credentials.js');

var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 36663);
app.use(express.static('public'));

app.get('/demo',function(req,res,next){
  var context = {};
  request('http://api.brewerydb.com/v2/locations?locality=ann%20arbor&key=' + credentials.bdbKey, function(err, response, body){
    if(!err && response.statusCode < 400){
      var parsedResponse = JSON.parse(body);
        var breweries = parsedResponse.data;
        context.city = breweries[0].locality;
        var breweryList = [];
        for (var i in breweries) {
          breweryList.push({'name': breweries[i].brewery.name, 'website': breweries[i].website})
        }
        context.breweryList = breweryList;
        res.render('demo', context);
    } else {
      console.log(err);
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.get('/', function(req,res,next){
    res.render('home');
});

app.get('/tools', function(req,res,next){
    res.render('tools');
});

app.get('/server', function(req,res,next){
    res.render('server');
});

app.get('/request', function(req,res,next){
    res.render('request');
});

app.get('/result',function(req,res,next){
  var context = {};
  request('http://api.brewerydb.com/v2/locations?locality=ann%20arbor&key=' + credentials.bdbKey, function(err, response, body){
    if(!err && response.statusCode < 400){
        var parsedResponse = JSON.parse(body);
        context.bCount = parsedResponse.totalResults;
        var breweries = parsedResponse.data;
        context.city = breweries[0].locality;
        var breweryList = [];
        for (var i in breweries) {
          breweryList.push({'name': breweries[i].brewery.name, 'website': breweries[i].website})
        }
        context.breweryList = breweryList;
        res.render('result', context);
    } else {
      console.log(err);
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
