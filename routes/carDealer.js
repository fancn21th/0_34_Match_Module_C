var express = require('express');
var router = express.Router();

/* GET drag and drop page. */
router.get('/', function(req, res, next) {
    res.render('carDealer2');
});

module.exports = router;
