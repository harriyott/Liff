
/*
 * GET place.
 */

exports.place = function(req, res){
  res.render('place', { title: 'Liff', place: req.params.place });
};