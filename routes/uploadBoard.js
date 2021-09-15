const express = require('express');
const router = express.Router();
const multer = require('multer');

// multer 미들웨어 등록
let uploadBoard = multer({
  dest: "uploadBoard/"
})

router.get('/show', function(req, res, next) {
  res.render("uploadBoard")
});

// 파일 업로드 처리
router.post('/create', uploadBoard.single("imgFile"), function(req, res, next) {
  
  let file = req.file

  let result = {
      originalName : file.originalname,
      size : file.size,
  }

  res.json(result);
});

module.exports = router;