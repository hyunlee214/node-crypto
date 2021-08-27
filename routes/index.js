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