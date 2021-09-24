'use strict';

const express = require('express');
const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const nodemailer = require('nodemailer');

const router = express.Router();

// BOARD MAIN 경로등록
// router.get('/board', function(req, res, next) {
//     res.render('board');
// });


// BOARD MAIN 경로등록2 , 
// post테이블에 있는 데이터 제공 구현 

// router.get('/board', function(req, res, next) {
//     models.post.findAll().then(result => {
//         res.render('board', {
//             posts: result
//         });
//     });
// });

router.get('/board', async function(req, res, next) {
    let result = await models.post.findAll();
    if (result){
      for(let post of result){
        let result2 = await models.post.findOne({
          include: {
            model: models.reply,
            where: {
              postId: post.id
            }
          }
        })
        if(result2){
          post.replies = result2.replies
        }
      } 
    }
    res.render('board', {
      posts : result
    });
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


// 데이터 수정 구현
router.get('/board/:id', function(req, res, next) {
    let postID = req.params.id;

    models.post.findOne({
        where: {id: postID}
    })
        .then(result => {
            res.render('edit', {
                post: result
            });
        })
        .catch(err => {
            console.log('data confirm failed');
        });
});

router.put('/board/:id', function(req, res, next) {
    let postID = req.params.id;
    let body = req.body;

    models.post.update({
        title: body.editTitle,
        writer: body.editWriter
    },{
        where: {id: postID}
    })
        .then( result => {
            console.log("데이터 수정 완료");
            res.redirect("/board");
        })
        .catch( err => {
            console.log("데이터 수정 실패");
        });
});


//데이터 삭제 구현
router.delete('/board/:id', function(req, res, next) {
    let postID = req.params.id;

    models.post.destroy({
        where :{id: postID}
    })
        .then(result => {
            res.redirect('/board')
        })
        .catch(err => {
            console.log('data delete failed');
        });
});

// reply 등록 기능
router.post('/reply/:postID', function(req, res, next) {
    let postID = req.params.postID;
    let body = req.body;

    models.reply.create({
       postId: postID, 
       writer: body.replyWriter,
       content: body.replyContent
    })
    .then (result => {
        res.redirect('/board');
    })
    .catch(err => {
        console.log(err);
    });
})


// --------------------------------------------------------------

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

// 게시글 정렬
router.get('/likeSearch', function(req, res, next) {
    models.test.findAll({
        order: [['postWriter', 'DESC']]
    })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        console.log(err);
    })
})


// OR 검색
router.get('/orSearch/:searchWord', function(req, res, next) {
    let searchWord = req.params.searchWord

    models.test.findAll({
        where : {
            [Op.or]: [
                {
                    postName: {
                        [Op.like]: searchWord
                    }
                },
                {
                    postWriter: {
                        [Op.like]: searchWord
                    }
                }
            ]
        }
    })
    .then (result => {
        res.json(result)
    })
    .catch (err => {
        console.log(err)
    })
})

// product > edit 파일 페이지 렌더링
// localhost:3232 페이지 렌더링
router.get('/',function(req, res, next) {
    res.render('product/edit', {
        title: "testing edit"
    });
});


//-----nodemailer사용--------//



router.post('/nodemailerTest', function(req, res, next) {
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email@gmail.com',
            pass: 'password'
        }
    });
    let mailOptions = {
        from: 'email@gmail.com',
        to: email,
        subject: 'tset nodemailer',
        text: 'testing'
    };
})



module.exports = router;
