
/*
 * GET place.
 */

exports.place = function(req, res) {
  var place = ( req.params.place ) ? req.params.place : 'Liff';
  res.render('place', { title: place, place: place });
};