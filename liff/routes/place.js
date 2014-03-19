
/*
 * GET place.
 */

exports.place = function(db) {
  return function(req, res) {
    db.collection('places').find({ 'slug' : req.params.place.toLowerCase() }).toArray(function (err, items){
      var place = items[0];
      res.render('place', { title: place.title, place: place.definition });
    });
  }
};