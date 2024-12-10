var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const homeRouter = require('./home');

// /* GET home page. */
// router.get('/main', ensureAuthenticated, function (req, res, next) {
//   res.render('main', { title: 'VoraSoft' });
// });

router.get('/', ensureAuthenticated, homeRouter);

module.exports = router;
