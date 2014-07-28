
/*
 * GET place.
 */

exports.place = function(db) {
  return function(req, res) {
    db.collection('places').find({ 'slug' : req.params.place.toLowerCase() }).toArray(function (err, items){
      var place = items[0];
      if ( place.lat === undefined ) {

      	var apiKey = require('../../data/mapapikey.json'),
      		request,
      		url;

      	url = 'http://dev.virtualearth.net/REST/v1/Locations?q=' + place.title + '&key=' + apiKey.key;
      	request = require('request');

      	request(url, function(err, resp, body) {

      		if ( err !== null ) {
      			return false;
      		}

      		body = JSON.parse(body)

    		place.lat = body.resourceSets[0].resources[0].point.coordinates[0];
      		place.lng = body.resourceSets[0].resources[0].point.coordinates[1];

      		res.render('place', { place : place });

      	});

      }
      
    });
  }
};