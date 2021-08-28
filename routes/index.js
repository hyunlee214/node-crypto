// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


// sequelize query - 유사 검색
const express = require('express');
const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();

// BOARD MAIN 경로등록
router.get('/board', function(req, res, next) {
    res.render('board');
});
// BOARD 데이터 추가 구현 - Sequelize사용
router.post('/board', function(req, res, next) {
    let body = req.body;

    models.post.create({
        title: body.inputTitle,
        writer: body.inputWriter
    })
        .then( result => {
            console.log('data add complete');
            res.redirect('/board');
        })
        .catch(err => {
            console.log('data add failed');
        })
});


// 검색 기능 경로등록 
router.get("/likeSearch/:searchWord", function(req, res, next){
  let searchWord = req.params.searchWord  

  models.test.findAll({
      where:{
          postName: {
              [Op.like]: "%" + searchWord + "%"
          }
      }
  })
      .then( result => {
          res.json(result)
      })
      .catch( err => {
          console.log(err)
      })
})

module.exports = router;