const router = require('express').Router();
const controller = require('./controller');

// before we send back a jwt, let's check
// the password and username match what is in the DB
router.post('/signin', controller.signin);

module.exports = router;
