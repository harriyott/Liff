/*
 * GET place.
 */
exports.place = function( db ) {
    return function( req, res ) {

        db.collection('places').find( { 'slug': req.params.place.toLowerCase() } ).toArray( function( err, items ) {
            
            if ( err !== null || items.length === 0 ) {
                res.render('404');
            } else {

                var place = items[0];

                if ( place.lat === undefined ) {
                    var geocode = require('../services/geocode');
                    geocode.Coordinates( place.title, function ( lat, lng ) {

                        place.lat = lat;
                        place.lng = lng;
                        
                        db.places.update( { "_id": place._id }, {
                            $set: {
                                "lat": place.lat,
                                "lng": place.lng
                            }
                        }, function () {
                            res.render('place', { place: place });
                        });

                    });
                } else {
                    res.render('place', { place: place });
                }

            }

        });
    }
};