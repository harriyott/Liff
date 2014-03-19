
/*
 * GET place.
 */

exports.place = function(db) {
  return function(req, res) {
    db.collection('places').find().toArray(function (err, items){
      console.log(items);
    });
    var place = ( req.params.place ) ? req.params.place : 'Liff';
    res.render('place', { title: place, place: place });
  }
};