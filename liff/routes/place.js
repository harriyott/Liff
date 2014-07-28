
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
      		console.log(err);
      		console.log(resp);
      		console.log(body);
      	});

      }
      res.render('place', { place : place });
    });
  }
};