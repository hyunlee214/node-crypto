/**
 * 파일 업로드 - OnePage multer
 *
 * 웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
 *    http://localhost:3000/public/multer.html
 *    http://localhost:3000/public/multer1.html
 *    http://localhost:3000/public/multer2.html
 *
 */

// Express 기본 모듈 불러오기
const express = require("express");
const http = require("http");
const path = require("path");
const static = require("serve-static");

// 파일 업로드용 미들웨어
const multer = require("multer");
const fs = require("fs");

// 익스프레스 객체 생성
const app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

const upload = multer({ dest: 'uploads/' });

app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

// 라우터 사용하여 라우팅 함수 등록
const router = express.Router();

app.post('/upload', upload.single('photo'), function (req, res, next) {
    const files = req.file;

    console.dir("#===== 업로드된 첫번째 파일 정보 =====#");
    console.dir(files);
    res.writeHead("200", {
      "Content-Type": "text/html;charset=utf8"
    });
    res.write("<h3>파일 업로드 성공</h3>");
    res.write("<hr/>");
    res.write(
      "<p>원본 파일명 : " + files.originalname +
      " -> 저장 파일명 : " + files.filename + "</p>"
    );
    res.write("<p>MIME TYPE : " + files.mimetype + "</p>");
    res.write("<p>파일 크기 : " + files.size + "</p>");
    res.end();
  })
  
app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    const files1 = req.files[0];
    const files2 = req.files[1];

    console.dir("#===== 업로드된 첫번째 파일 정보 =====#");
    console.dir(req.files[0]);
    console.dir(req.files[1]);
    res.writeHead("200", {
        "Content-Type": "text/html;charset=utf8"
      });
      res.write("<h3>파일 업로드 성공</h3>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일명 : " + files1.originalname +
        " -> 저장 파일명 : " + files1.filename + "</p>"
      );
      res.write("<p>MIME TYPE : " + files1.mimetype + "</p>");
      res.write("<p>파일 크기 : " + files1.size + "</p>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일명 : " + files2.originalname +
        " -> 저장 파일명 : " + files2.filename + "</p>"
      );
      res.write("<p>MIME TYPE : " + files2.mimetype + "</p>");
      res.write("<p>파일 크기 : " + files2.size + "</p>");
      res.end();
  })
  
  const cpUpload = upload.fields([{ name: 'avatar', maxCount: 2 }, { name: 'gallery', maxCount: 8 }])
  app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
    const files1 = req.files['avatar'][0];
    const files2 = req.files['avatar'][1];
    const files3 = req.files['gallery'][0];

    console.dir("#===== 업로드된 첫번째 파일 정보 =====#");
    console.dir(files1);
    console.dir(files2);
    console.dir(files3);
    res.writeHead("200", {
        "Content-Type": "text/html;charset=utf8"
      });
      res.write("<h3>파일 업로드 성공</h3>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일명 : " + files1.originalname +
        " -> 저장 파일명 : " + files1.filename + "</p>"
      );
      res.write("<p>MIME TYPE : " + files1.mimetype + "</p>");
      res.write("<p>파일 크기 : " + files1.size + "</p>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일명 : " + files2.originalname +
        " -> 저장 파일명 : " + files2.filename + "</p>"
      );
      res.write("<p>MIME TYPE : " + files2.mimetype + "</p>");
      res.write("<p>파일 크기 : " + files2.size + "</p>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일명 : " + files3.originalname +
        " -> 저장 파일명 : " + files3.filename + "</p>"
      );
      res.write("<p>MIME TYPE : " + files3.mimetype + "</p>");
      res.write("<p>파일 크기 : " + files3.size + "</p>");
      res.end();
  })

app.use("/", router);

// Express 서버 시작
http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});