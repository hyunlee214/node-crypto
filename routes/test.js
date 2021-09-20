const express = require('express');
const router = express.Router();

// http://localhost:3232/test/testingRouter
router.get ('/testingRouter', function(req, res, next) {
  res.send('testRouter OK')
})

module.exports = router;