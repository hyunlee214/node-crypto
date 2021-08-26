const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

let stroage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

let upload = multer({ storage: stroage });


router.get('/page', function(req, res, next) {
  res.render('multer')
});

router.post('/create', upload.single('imgFile'), function(req, res, next) {
  let file = req.file
  let result = {
    originalName : file.originalname,
    size: file.size,
  }

  res.json(result);
})

module.exports = router;