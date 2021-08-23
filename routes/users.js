const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const models = require('../models');

router.get('/sign_up', function(req, res, next) {
  res.render('user/signup');
});

router.post('/sign_up', function(req, res, next) {
  let body = req.body;

  //crypto 모듈 사용 => hashPassword생성

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";      
  // salt적용해서 암호화 강화 (현재 시간 * 랜덤값으로 문자열 생성)
  let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');
  // 암호화 강화를 위해 'sha512 알고리즘' 사용

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: body.password,
    salt: salt                    
  })
    res.redirect('/users/sign_up');
  })


  router.get('/', function(req, res, next) {
    if (req.cookies) {
      console.log(req.cookies);
    }
    res.send('환영합니다');
  });

  router.get('/login', function(req, res, next) {
      let session = req.session;

      res.render('user/login', {
        session : session
      });
  });

  router.post('/login', async function(req, res, next) {
    let body = req.body;

    let result = await models.user.findOne({
      where: {
        email: body.userEmail
      }
    });

    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    if(dbPassword === hashPassword){
        console.log("비밀번호 일치");

        req.session.email = body.userEmail;
    }
    else{
        console.log("비밀번호 불일치");
  }
  res.redirect('/user/login');
});

module.exports = router;