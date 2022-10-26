// require => 다른 파일이나 라이브러리를 첨부할 때 사용하는 문법
// require("파일경로") or require("라이브러리명") 
// ex) 다른 곳에서 shop.js 파일을 갖다 쓰고 싶을 때는 require("/shop.js")
// npm으로 설치했던 express라이브러리의 Router()라는 함수를 갖다 쓰겠습니다.
const router = require("express").Router();


// app 대신에 router 쓰기
// router.get('/shop/shirts', (req, res) => {
//   res.send('셔츠 파는 페이지입니다.');
// });

// router.get('/shop/pants', (req, res) => {
//   res.send('바지 파는 페이지입니다.');
// });


// 중복되는 url 라우터에서 세부 라우팅해주기
router.get('/shirts', (req, res) => {
  res.send('셔츠 파는 페이지입니다.');
});

router.get('/pants', (req, res) => {
  res.send('바지 파는 페이지입니다.');
});

// module.exports => js 파일을 다른 파일에서 갖다 쓰고 싶을 때 사용하는 문법
// moduel.exports = "내보낼 변수명"
module.exports = router;