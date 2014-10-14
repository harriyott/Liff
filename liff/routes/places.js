/*
 * GET place.
 */
exports.places = function( db ) {
    return function( req, res ) {

        var page = parseInt(req.query.page),
            size = parseInt(req.query.size) ? parseInt(req.query.size) : 10,
            skip = page > 0 ? ((page - 1) * size) : 0;

        db.collection('places').find( null, null, { skip: skip, limit: size } ).toArray( function( err, items ) {
            
            if ( err !== null || items.length === 0 ) {
                res.render('404');
            } else {
                res.render('place-archive', { places: items } );;
            }

        });
    }
};