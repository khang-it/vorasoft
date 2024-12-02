var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const { diskusage } = require('../utils/diskusage')

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('main', { title: 'VoraSoft' });
});

router.get('/disk-usage', async (req, res) => {
  const disk = await diskusage();
  console.log('disk:', disk)
  res.json({
    used: disk?.used || (disk?.total - disk?.available),
    free: disk?.free,
    total: disk?.total,
  });

});

module.exports = router;
