
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '절친 월드컵' });
};