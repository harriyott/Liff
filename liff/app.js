
/**
 * Module dependencies.
 */

var databaseUrl = "liffDB",
	collections = ['places', 'books'],
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

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


var fs = require('fs');
var file = '../data/data.js';

fs.readFile(file, 'utf8', function (errRead, data) {

    if (errRead) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);

    data.forEach(function(entry) {
        
        db.places.findOne({slug: entry.slug}, function (err, place) {
            if ( ! place ) {
                db.places.findAndModify({
                    query: { slug: entry.slug },
                    update: { $set: entry },
                    new: true,
                    upsert: true
                }, function (error, insertedPlace) {
                    if ( ! error ) {
                        console.log('Added: ' + insertedPlace.slug);
                    } else {
                        console.log('Error: ' + error);
                    }
                });
            } else {
                console.log('Breaking on: ' + place.slug);
            }
        });   
    });
});
