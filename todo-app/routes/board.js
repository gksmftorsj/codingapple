const router = require("express").Router();

// 로그인했는지 안했는지 알려주는 함수 만들기(미들웨어 만드는법)
function 로그인했니(req, res, next) {
  // 로그인한 유저 있으면
  if (req.user) {
    // next() = 통과시켜주세요
    next()
  } else {
    // 로그인한 유저 없으면
    res.send("로그인안하셨는데요?")
  }
}

// 여기있는 모든 URL에 적용할 미들웨어
router.use(로그인했니);

// 특정 URL에 적용할 미들웨어
// router.use("/sports", 로그인했니)

router.get('/sports', (req, res) => {
  res.send('스포츠 게시판');
});

router.get('/game', (req, res) => {
  res.send('게임 게시판');
});

module.exports = router;