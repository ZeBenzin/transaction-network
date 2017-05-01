var router = require('express').Router();

router.use('/addresses', require('./addresses/addressesRouter'));

module.exports = router;
