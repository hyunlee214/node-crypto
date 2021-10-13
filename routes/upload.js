const express     = require('express');
const path        = require('path');
const router      = express.Router();
const multer      = require('multer');

let storage   = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

// 업로드 경로 : localhost:3232/upload/page
// 업로드 완료 시 경로 : localhost:3232/upload/create

router.get('/page', (req, res) => {
  res.render('multer');
})

router.post('/create', upload.single('imgFile'), (req, res) => {
  let file = req.file
  let result = {
    originalName : file.originalname,
    size: file.size, 
  }

  res.json(result);
})

module.exports = router;