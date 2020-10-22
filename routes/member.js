const express = require('express');
const router = express.Router(); // new Router(); 생성자로 인스턴스를 만든 것과 동일

router.get('/login', (req, res, next) => {
  const pug = {
    title: "로그인 페이지",
    scriptFile: '../js/f-member.js'
  }
  res.render('./member/login.pug', pug);
});
router.get('/naver', (req, res, next) => {
  res.render('./naver.pug');
});

module.exports = router;