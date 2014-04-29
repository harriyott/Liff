
/**
 * Module dependencies.
 */

var databaseUrl = "liffDB",
	collections = ['places','books'],
	express = require('express'),
	routes = require('./routes'),
	place = require('./routes/place'),
	style = require('./routes/style'),
	http = require('http'),
	path = require('path'),
	app = express(),
	db = require('mongojs').connect(databaseUrl, collections);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/style', style.style);
app.get('/place/:place', place.place(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var fileJSON = require('./data/import.json');
console.log( JSON.parse( fileJSON ) );