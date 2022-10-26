// npm init 후에 enter 눌러서 entry point 에 "server.js" 입력후 완료시키면 package.json생성 완료
// npm install express로 express 라이브러리 설치
// npm install -g nodemon서버 전원 자동으로 껏다 켜는 라이브러리 설치
// nodemon server.js했을 때 오류나면 windows PowerShell을 관리자 모드로 실행 후 executionpolicy라고 쳤을 때 Restricted라고 나오면
// set-executionpolicy unrestricted라고 쳐서 실행 규칙을 변경(Y) 후 다시 nodemon server.js하면 됨
// input에 적은 정보는 req에 숨어있다 쉽게 꺼내쓰려면 body-parser 라이브러리가 필요하지만 2021이후 설치한 express에는 기본 포함이라 따로 설치할 필요없음
// app.use(express.urlencoded({ extended: true })); 이 코드만 위쪽에 추가해주면 됨
// body-parser는 요청 데이터(body) 해석을 쉽게 도와줌

// server open 기본문법
// 아까 설치한 라이브러리를 첨부해주세요.
const express = require("express");
// express에 있는 body-parser 사용하기
// 아까 첨부한 라이브러리를 이용해서 객체를 만들어주세요.
const app = express();
app.use(express.urlencoded({ extended: true }));

// npm install socket.io
// socket.io 셋팅방법 => const app = express(); 밑에만 쓰면 됨
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

// npm install dotenv => 환경변수 사용을 위한 라이브러리 설치
// 사용법은 server.js와 같은 경로에 .env 파일 생성후 값 저장
// => process.env.변수명으로 사용할 수 있음
require("dotenv").config();

// MongoClient.connect("url"(아이디, 비번, 데이터베이스이름 잘 입력하기), (err, client)=>{})
const MongoClient = require("mongodb").MongoClient;

let db; // 변수 하나 필요
// connect는 연결해주세요 => database 접속이 완료되면 안에 있는 코드 실행해주세요
MongoClient.connect(
  process.env.DB_URL,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    db = client.db("todoapp"); // todoapp 이라는 database(폴더)에 연결좀요
    // db.collection("post").insertOne("저장할데이터", (에러, 결과)=>{});

    // app.listen => express를 이용해서 서버 띄우던걸
    // http라는 nodejs 기본 라이브러리+socket.io를 이용해서 띄우기 위해 app=>http로 변경
    // listen(서버띄울 포트번호, 띄운 후 실행할 코드)
    http.listen(process.env.PORT, () => {
      console.log("listening on 8080");
    });
  }
);

// /socket으로 접속하면 socket.ejs 페이지 보여주기
app.get("/socket", (req, res) => {
  res.render("socket.ejs")
})

// 누가 WebSocket에 접속하면 내부 코드 실행해주셈
io.on("connection", (socket) => {
  console.log("유저접속됨");


  // 서버는 joinroom라는 이름의 메세지를 받으면 채팅방 넣어주면 될듯
  socket.on("joinroom", (data) => {
    // 채팅방 만들고 입장은 socket.join(방이름)
    // 방이름에 들어가면 방이름에 들어간 사람들끼리만 채팅가능함
    socket.join("room1");
    console.log("room1입장");
  })

  socket.on("room1-send", (data) => {
    // room1을 넣어주면 room1에 들어간 유저들에게만 전송됨
    io.to("room1").emit("broadcast", data);
  })




  // 서버는 그냥 data를 수신할 수 없고 수신하려면 수신하는 코드를 작성해줘야함
  // 누가 "user-send" 이름으로 메세지 보내면 내부 코드 실행해주셈
  // 콜백함수 parameter(data(any))에 유저가 보낸 메세지가 숨겨져있음
  socket.on("user-send", (data) => {
    console.log(data);
    // 서버가 유저에게 웹소켓으로 실시간 메세지 보내는 법 => socket.emit(작명(any), 메세지)
    // 관습적으로 broadcast를 사용함
    // io.emit()은 모든 유저에게 메세지 보내줌
    // 유저가 메세지를 보내면 모든 사람에게 보내주세요~
    io.emit("broadcast", data);
    // to(socket.id) => 목적지 설정가능 => socket.id를 가진 사람한테만 메세지를 전송해줄 수 있음
    // socket = 유저가 WebSocket에 접속하면 접속한 유저의 모든 정보가 들어있음(쿠키도 들어있을걸요?)
    // so socket.id = 지금 접속한 유저의 유니크한 id임
    // io.to(socket.id).emit("broadcast", data);
  })
})


// ObjectId 담고 싶을 때 사용
const { ObjectId } = require("mongodb");

// npm install ejs 설치
// EJS는 HTML을 좀 더 쓰기 쉽게 만들어주는 템플릿임
// list.html을 list.ejs로 이름바꾸면 ejs 문법 이용해서 서버데이터 삽입 가능
app.set("view engine", "ejs");

// 나는 static 파일을 보관하기 위해 public 폴더를 쓸거다
app.use("/todo-app/public", express.static("public"));

// HTML form에서 PUT/DELETE 요청하려면 npm install method-override 해서 라이브러리 설치해야함
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// "/"주소는 그냥 홈페이지 메인 주소
app.get("/", (req, res) => {
  // .sendFile("보낼파일경로")
  // __dirname은 현재 파일의 경로를 뜻함
  // res.sendFile(__dirname + "/index.html");
  res.render("index.ejs");
});
app.get("/write", (req, res) => {
  // 응답.sendFile(__dirname + "/write.html");
  res.render("write.ejs");
});

// list로 GET요청으로 접속하면 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌
app.get("/list", (req, res) => {
  // 나는 파일명이 post인 데이터를 다루고 싶다
  // DB에 저장된 post라는 collection안의 모든 데이터 or id가 ~인 데이터 or name이 ~인 데이터 꺼내주세요
  // .find().toArray() => 모든 데이터 가져오기
  db.collection("post")
    .find()
    .toArray((err, result) => {
      // console.log(result);
      // console.log(result[0]);
      // console.log(result[0].제목);
      // console.log(result[0].날짜);

      // 누군가 /list로 접속하면 ejs파일을 렌더링 해줌
      // 찾은걸(result) ejs파일에 집어넣음
      res.render("list.ejs", { posts: result });
    });
});

app.get("/search", (req, res) => {
  // req.query = 서버에서 query string 값 꺼내기
  console.log(req.query);
  // console.log(req) => 요청한 유저의 정보가 다 담겨있음
  // 근데 이렇게 요청하면 정확하게 일치하는 값만 찾아주고 포함되는 값은 안찾아줌
  // => 정규식 쓰면 간단히 해결 => {제목:/하기/} => 하기 들어가는 항목 다 찾아줌 But 정규식은 임시방편일뿐임 => 게시물이 10만 개, 100만 개일 때 다 찾는건 항상 오래걸림
  // Binary Search -> indexing 해두면 게시물 1억개라도 찾기 빨라짐
  // db.collection("post").find({ 제목: req.query.value }).toArray((err, result) => {
  //   res.render("search.ejs", { posts: result })
  // })
  // Binary Search 적용하려면 미리 숫자순 정렬이 되어있어야함
  // (MongoDB특징) => _id순으로 정렬 미리 되어있음 그래서 _id로 찾을 땐 Binary Search해줌
  // 근데 제목순으로는 안되어있음 그래서 미리 정렬해주면(indexing 해두면) DB는 알아서 Binary Search 해줌
  // index = 기존 collectiond을 정렬해놓은 사본
  // index 생성방법 => 원하는 collection에서 create index 찾아누르셈 => 어떤 항목을 정렬하고 싶은지 작성
  // ex) "제목": "text"(문자자료는 type을 "text")
  // ex) "_id": 1 or -1(숫자자료는 type을 1 or -1)
  // 1. Binary Search 적용하고 싶으면 Index 만들어두십시오
  // 2. MongoDB 문자자료는 index 만들 때 한꺼번에 하십시오
  // 3. DB조작은 원래 터미널로합니다.
  // <단어> 스페이스바 <단어> 해주면 or 식으로 검색해줌
  // <단어> 스페이스바 -<단어> 시에 -<단어> 제외하고 검색해줌
  // "단어" ""에 들어간 단어만 정확하게 검색해줌
  // text index의 문제점 => 띄어쓰기 기준으로 단어를 저장하기 때문에 다른 단어와 겹쳐있으면 인식을 못함
  // 그래서 한국어 중국어 일본어에는 쓰레기임
  // db.collection("post").find({ $text: { $search: req.query.value } }).toArray((err, result) => {
  //   res.render("search.ejs", { posts: result })
  // })
  // 해결책
  // 1. 그냥 text index 쓰지말고 검색할 문서의 양을 제한두기(오늘부터 일주일간 발행된 게시물에서만 찾아봐라)
  // 2. text index 만들 때 다르게 만들기(띄어스기 단위로 indexing 금지 => 글자 두 개 단위로 idexing해봐라(nGram))
  // 3. serach index 쓰셈 => lucene.korean = ~을 ~를 이런 쓸데없는 조사를 제거해줌
  // indexing 하면 DB용량 차지함 그러므로 꼭 필요한 것만 indexing 하도록 하자
  // aggregate = 검색조건 여러 개 입력가능 .aggregate([{여}, {러}, {개}])
  const 검색조건 = [
    {
      $search: {
        index: "titleSearch",
        text: {
          // 검색어 입력하는 부분
          query: req.query.value,
          // collection 항목 중에 어떤 항목을 검사할 것인지?
          // => 제목, 날짜 둘 다 찾고 싶으면 ["제목", "날짜"]
          path: "제목",
        },
      },
    },
    // 만약 sort가 없으면 searchScore를 자동으로 판단해서 순서대로 정렬해줌(단어가 자주 들어가면 score 높음)
    // 0 or 안쓰면 = 안가져옴, 1 = 가져옴, score 가져 오고 싶을 때 score: { $meta: "searchScore" } 사용
    { $project: { 제목: 1, _id: 0, score: { $meta: "searchScore" } } },
    // 정렬하고 싶을 때 (숫자 오름차순 => 1 / 내림차순 => -1)
    { $sort: { _id: 1 } },
    // 가져오고 싶은 갯수 아래에서부터 자름
    { $limit: 2 },
  ];
  db.collection("post")
    .aggregate(검색조건)
    .toArray((err, result) => {
      console.log(result);
      res.render("search.ejs", { posts: result });
    });
});

// Parameter로 요청가능한 URL 만들기
// req.params.id => url의 parameter 중에 id라고 이름지은 parameter를 집어넣어주세요
app.get("/detail/:id", (req, res) => {
  // database에 int형태이기 때문에 찾을 때 int형태로 변환시켜줘야함
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log(result);
      res.render("detail.ejs", { data: result });
    }
  );
});

app.get("/edit/:id", (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log(result);
      res.render("edit.ejs", { post: result });
    }
  );
});

// npm install passport passport-local express-session => Session 방식 로그인 기능 구현하기위해 라이브러리 3개 설치 / npm install 하고 띄어쓰기 하면 여러 개 설치가능
// server.js에 라이브러리 첨부
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

// app.use(미들웨어) => 나는 미들웨어를 쓰겠습니다. / 미들웨어 = 요청-응답 중간에 뭔가 실행되는 코드
// secret에는 아무거나 적어도 됨 세션을 만들 때 사용되는 비밀번호 같은 거임
app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize()); // 전역 미들웨어
app.use(passport.session()); // 전역 미들웨어

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// app.post("/login", passport.authenticate("local", {
//   failureRedirect: "/fail"
// }), (req, res) => {
// 회원인증 성공하면 이("/") 경로로 이동시켜주세요
// res.redirect("/")
// })
// => local 방식으로 회원인지 인증해주세요
// => failureRedirect => 로그인 실패 시 이("/fail") 경로로 이동시켜주세요

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/fail",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/fail", (req, res) => {
  res.send("로그인에 실패하셨습니다.");
});

app.get("/mypage", 로그인했니, (req, res) => {
  // req.user = deserializeUser의 result값
  console.log(req.user);
  res.render("mypage.ejs", { 사용자: req.user });
});

// 로그인했는지 안했는지 알려주는 함수 만들기(미들웨어 만드는법)
function 로그인했니(req, res, next) {
  // 로그인한 유저 있으면
  if (req.user) {
    // next() = 통과시켜주세요
    next();
  } else {
    // 로그인한 유저 없으면
    res.send("로그인안하셨는데요?");
  }
}

// 로그인성공 => 세션정보를 만듦 => 마이페이지 방문시 세션검사 순서

// 로그인할 때 실행되는 코드
// 누가 /login으로 POST 요청하면(로그인시) 아래 코드를 이용해서 아이디/비번 검증해줌
passport.use(
  new LocalStrategy(
    {
      // usernameField는 form의 id라는 name을 가진 친구입니다.
      // passwordField는 form의 pw라는 name을 가진 친구입니다.
      // => 유저가 입력한 이이디/비번 항목이 뭔지 정의(name속성)
      // so name을 id가 아닌 email로 했다면 "id"대신 => "email"을 써야함
      usernameField: "id",
      passwordField: "pw",
      // 로그인 후 세션을 저장할 것인지 true of false 여부
      session: true,
      // 아이디/비번 말고도 다른 정보 검증시 true 사용하면 됨 그러면 맨 앞에 parameter에 하나 더 집어넣을 수 있는데(ex) req) 사용자가 입력한 아디디/비번 말고도 다른 데이터들이 그 parameter에 담김 => ex) req.body하면 데이터들 뽑을 수 있음
      passReqToCallback: false,
      // 아이디/비번 맞는지 DB와 비교하는 코드
    },
    (입력한아이디, 입력한비번, done) => {
      console.log(입력한아이디, 입력한비번);
      db.collection("login").findOne({ id: 입력한아이디 }, (err, result) => {
        // 뭔가 매칭이 성공이 됐다 or 실패가 됐다 할 때 쓰는게 done()
        // done() = 3개의 parameter를 가질 수 있음
        // done(서버에러, 성공시 보낼 사용자DB데이터, 에러메세지)
        // 첫 번째 parameter는 서버에러 넣는 곳 DB연결불가 등 근데 보통 첫 if(err)에서 처리되므로 무시해도 됨
        // 두 번째 parameter에서 만약 아이디/비번 안맞으면 false 넣어야함
        // 세 번째 parameter는 에러메세지 적어주면 됨
        // DB에 아무것도 없으면 실행
        if (err) return done(err);
        // 만약 DB에 아이디가 없으면 실행
        if (!result)
          return done(null, false, { message: "존재하지 않는 아이디요" });
        // DB에 아이디가 있고 입력한비번과 result.pw가 같으면 실행
        // 보안이 쓰레기임 => pw를 그대로 비교하면 안되고 암호화해서 비교해야 함
        if (입력한비번 === result.pw) {
          return done(null, result);
        } else {
          // DB에 아이디가 있고 입력한비번과 result.pw가 같지 않으면 실행
          return done(null, false, { message: "비번틀렸어요" });
        }
      });
    }
  )
);

// 아이디/비번 맞으면 세션을 하나 만들어줘야 할듯
// 세션을 저장시키는 코드(로그인 성공 시 발동)
// serializeUser = 이 유저의 정보를 암호문으로 만든 뒤 세션으로 저장시킴
// 아이디/비번 검증 성공 시 user로 데이터를 보냄 => 첫 번째 parameter(user)에 위 login DB에서 찾은 결과가 들어감
passport.serializeUser((user, done) => {
  // user.id라는 정보를 이용해서 세션을 만듦
  // 세션 데이터를 만들고 세션의 id 정보를 쿠키로 보냄
  done(null, user.id);
});
// 나중에 호출되는 애
// 이 사람이 세션 데이터에 있으면 이 사람이 어떤 사람인지 해석하는 부분
// 세션 데이터를 가진 사람을 DB에서 찾아주세요(마이페이지 접속 시 발동)
// 아이디에 위에서 done(null, user.id)값중 user.id 값이 들어옴
passport.deserializeUser((아이디, done) => {
  db.collection("login").findOne({ id: 아이디 }, function (err, result) {
    done(null, result);
    // 여기서 결과엔 { id : 입력한 id, pw : 입력한 pw, 이름 : 이름 } 등 내가 넣은 정보들이 저장
    // 결과에 담긴 데이터들은 app.get('/mypage')에서 req.user (req.user) 에 담겨있음
  });
});

// 저장전에 id가 이미 있는지 먼저 봐야함
// id에 알파벳 숫자만 잘 들어있나 봐야함
// 비밀번호를 저장할 땐 난수로 바꿔서 DB에 저장하고 로그인시에도 난수로 바꿔서 비교하셔야합니다. 이것도 쉽게 암호화해주는 라이브러리들이 매우 많습니다.
app.post("/register", (req, res) => {
  const register_id = req.body.id;
  const register_pw = req.body.pw;
  // 아이디 비밀번호 정규식
  // const idValChk = /^[a-z0-9]+$/;
  // const pwValChk = /^[a-zA-Z0-9]+$/
  // if (register_id === "" && register_pw !== "") {
  //   res.send("<script>alert(`아이디를 입력해주세요.`); window.location.replace(`/login`)</script>")
  //   return false;
  // } else if (register_id !== "" && register_pw === "") {
  //   res.send("<script>alert(`비밀번호를 입력해주세요.`); window.location.replace(`/login`)</script>")
  //   return false;
  // } else if (register_id === "" && register_pw === "") {
  //   res.send("<script>alert(`값을 입력해주세요.`); window.location.replace(`/login`)</script>")
  //   return false;
  // }
  // if (!idValChk.test(register_id) || register_id.length < 6) {
  //   res.send("<script>alert(`아이디는 영소문자, 숫자로 구성된 6글자 이상으로 조합하시오.`); window.location.replace(`/login`)</script>")
  //   return false;
  // }
  // if (!pwValChk.test(register_pw) || register_pw.length < 8) {
  //   res.send("<script>alert(`비밀번호는 영대소문자, 숫자로 구성된 8글자 이상으로 조합하시오.`); window.location.replace(`/login`)</script>")
  //   return false;
  // }
  db.collection("login").findOne({ id: register_id }, (err, result) => {
    if (result === null) {
      db.collection("login").insertOne(
        { id: register_id, pw: register_pw },
        (err, result) => {
          res.send(
            "<script>alert(`회원가입이 완료되었습니다.`); window.location.replace(`/login`)</script>"
          );
        }
      );
    } else {
      res.send(
        "<script>alert(`이미 존재하는 아이디입니다`); window.location.replace(`/login`)</script>"
      );
    }
  });
});

// 어떤 사람이 /add 경로로 POST 요청을 하면...
// ??를 해주세요~

// POST요청으로 서버에 데이터 전송하고 싶으면
// 1. body-parser필요
// 2. form데이터의 경우 input들에 name쓰기

// app.post("경로", (req, res)=>{실행할 코드})
// 회원기능코드 밑으로 내려야 user._id 정보를 얻을 수 있음

app.post("/add", (req, res) => {
  res.send("전송완료");
  // req.body라고 하면 요청했던 form에 적힌 데이터 obj형태로 수신가능
  // req.body.(input's name)까지 하면 form중에 name인 데이터만 뽑아서 수신가능
  console.log(req.body);
  console.log(req.body.title);
  // DB에 저장해주세요

  // 발행된 총 게시물 갯수를 기록하는 저장공간 따로 관리하기
  // data를 한 개만 찾고 싶을 때는 findOne({어떤데이터를 찾을지});
  // ex) findOne({name:"게시물갯수"}) => name이 게시물갯수인 data 찾기
  db.collection("counter").findOne({ name: "게시물갯수" }, (err, result) => {
    // console.log(req.user._id);
    console.log(result.totalPost);
    const 총게시물갯수 = result.totalPost;

    // 어떤 사람이 /add 라는 경로로 post 요청을 하면, 데이터 2개(날짜, 제목)를 보내주는데, 이 때, "post"라는 이름을 가진 collection에 두 개 데이터를 저장하기
    // {제목: "어쩌구", 날짜: "어쩌구"}

    // req.user = 현재 로그인한 사람의 정보가 모두 들어있음 => deserializeUser에서 가져온 값임
    // 이 정보들은 deserializeUser() 이 함수에서 제공있음
    // 원래라면 그냥 유니크한 ID만 저장해서 나중에 필요할 때 그 ID로 찾으면 되지만
    // NoSQL DB인 MongoDB는 그냥 작성자 이름 이런 부가정보도 게시물이랑 함께 저장함
    // 장점: 작성자이름 꺼낸다고 다른 collection 뒤질 필요 없음 => 일명 denormalizing이라고 함
    console.log(req.user);
    const saveData = {
      _id: 총게시물갯수 + 1,
      작성자: req.user._id,
      제목: req.body.title,
      날짜: req.body.date,
    };

    db.collection("post").insertOne(saveData, (err, result) => {
      console.log("저장완료");
      // counter라는 콜렉션에 있는 totalPost라는 항목도 1 증가시켜야함(수정)
      // 한 번에 많은 data를 수정하고 싶을 때는 updateMany();
      // 한 번에 한 개의 data를 수정하고 싶을 때는 updateOne({어떤데이터를 수정할지},{operator},()=>{});
      // ex) updateOne({name: "게시물갯수"},{$set : {totalPost:1}},()=>{});
      // update할 때는 operator를 사용해야함 => {$set:{바꿀값}}
      // operator 종류 => $set(변경), $inc(증가), $min(기존값보다 적을 때만 변경), $rename(key값 이름변경) 등
      // {$set:{totalPost:바꿀값}} / {$inc:{totalPost:기존값에 더해줄 값}}
      db.collection("counter").updateOne(
        { name: "게시물갯수" },
        { $inc: { totalPost: 1 } },
        (err, result) => {
          if (err) {
            return console.log(err);
          }
        }
      );
    });
  });
});

app.delete("/delete", (req, res) => {
  console.log(req.body);
  // obj 값 변경해주기 => 변경된 후에는 obj 값이 int값으로 변경되어있음
  req.body._id = parseInt(req.body._id);
  // req.body에 담겨온 게시물번호를 가진 글을 db에서 찾아서 삭제해주세요
  // 한 번에 한 개의 data를 삭제하고 싶을 때는 deleteOne({어떤데이터를 삭제할지},()=>{});
  // 이미 req.body가 obj=>{}형태이기 때문에 그냥 req.body만 사용해야함
  // 데이터를 주고 받을 때 문자("")로 변환되는 경우가 있음 그러므로 다시 숫자로 변환해야 제대로 데이터를 찾을 수 있음

  // 로그인한 유저 자신 게시물만 삭제할 수 있도록 하기
  // delete할 때 fadeout 이벤트 넣었기 때문에 사라지는 모습만 보여주고 실제로는 삭제되지 않음
  const deleteData = {
    _id: req.body._id,
    작성자: req.user._id,
  };

  db.collection("post").deleteOne(deleteData, (err, result) => {
    console.log("삭제완료");
    if (result) {
      console.log(result);
    }
    // .status(응답코드 200을 보내주세요) & .send(메세지도 보내주세요)
    // 2XX를 보내면 요청성공이라는 뜻
    // 4XX를 보내면 고객 잘못으로 요청실패라는 뜻
    // 5XX를 보내면 서버 문제로 요청실패라는 뜻
    // 서버는 꼭 뭔가 응답해줘야함
    res.status(200).send({ message: "성공했습니다" });
  });
});

app.put("/edit", (req, res) => {
  // form에 담긴 제목데이터, 날짜데이터를 가지고 db.collection에다가 업데이트함
  // input name 중에 id인 값을 넣어주세요

  const id = parseInt(req.body.id);
  const title = req.body.title;
  const date = req.body.date;

  const editData = {
    _id: id,
    작성자: req.user._id,
  };

  db.collection("post").updateOne(
    editData,
    { $set: { 제목: title, 날짜: date } },
    (err, result) => {
      console.log("수정완료");
      res.redirect("/list");
    }
  );
});

// server.js에 shop.js라우터 첨부하기
// shop.js파일을 여기에 첨부하겠습니다.
// 경로 적을 때 "./"(현재경로)부터 시작하는게 nodejs 환경에서 국룰임
// 고객이 "/"경로로 요청했을 때 이런 미들웨어(방금만든 라우터) 적용해주세요~
// app.use("/", require("./routes/shop.js"));
// 중복되는 url 세부라우팅 해주기 => 조금 더 직관적이고 관리가 편함
// 이건 /shop으로 시작하는 라우트들이구나!(알아보기 쉬움)
app.use("/shop", require("./routes/shop.js"));

app.use("/board/sub", require("./routes/board.js"));

// 업로드한 이미지 저장하는법 => 보통 작업폴더 안에 저장시킴
// DB에 저장하면 안되나요? 맘대로하세요(일반적으로 그렇게하지 않을뿐)
// DB에 저장하지 않는 이유 1.용량이 크기도 하고 2.일반하드에 저장하는게 싸고 편함
// npm install multer 설치하기 => 파일전송한 것 쉽게 처리해주는 라이브러리

const multer = require("multer");

// path라는 변수는.. nodejs 기본 내장 라이브러리 path 라는걸 활용해 파일의 경로, 이름, 확장자 등을 알아낼 때 사용합니다.
var path = require("path");

// diskStorage 이미지를 어디에 저장할지 정의하는 함수 => 같은 폴더 안에 저장해주세요
// memoryStorage RAM에 저장해주세요(휘발성있게 저장하고 싶을 때)
const storage = multer.diskStorage({
  // public/img 폴더 안에 이미지가 저장됨
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  // 저장한 이미지의 파일명 설정하는 부분(기존 오리지널파일명 그대로 저장해주세요)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  // 파일명을 다이나믹하게?
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname + "날짜" + new Date())
  // }
  // 파일형식(확장자) 거르기
  // fileFilter: function (req, file, callback) {
  //   var ext = path.extname(file.originalname);
  //   if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
  //     return callback(new Error('PNG, JPG만 업로드하세요'))
  //   }
  //   callback(null, true)
  // },
  // // 파일사이즈 제한하기
  // limits: {
  //   fileSize: 1024 * 1024
  // }
});

const upload = multer({ storage: storage });

app.get("/upload", (req, res) => {
  res.render("upload.ejs");
});

// 이미지 업로드 시 multer 동작시키기
// 파일 한 개 업로드 => upload.single("input의 name속성이름")
// 파일을 여러 개 업로드 => upload.array("input의 name속성이름", 받을 최대 갯수)
// 파일 여러 개 업로드하려면 input에 multiple 속성 넣어줘야함
app.post("/upload", upload.single("profile"), (req, res) => {
  res.send("업로드완료");
});

// 업로드한 이미지 보여주기
// 누군가 /어쩌구로 접속하면 어쩌구.jpg 보내줌
// URL 파라미터 문법 => :any => req.params.any
// any에 한글로 작명하면 잘 안될 때가 있으니까 영어로 하자
app.get("/img/:imgName", (req, res) => {
  // 파일보내려면 sendFile
  // __dirname = 현재파일경로
  // __dirname(현재파일경로)/public/img/imgName
  res.sendFile(__dirname + "/public/img/" + req.params.imgName);
});

app.post("/chatroom", 로그인했니, (req, res) => {
  // ObjectId() 안에 담고 싶으면 const { ObjectId } = require("mongodb") 사용하자
  const saveData = {
    title: "무슨무슨채팅방",
    member: [ObjectId(req.body.채팅당한사람id), req.user._id],
    data: new Date(),
  };

  // 콜백함수를 써야 insert 됐을 때 코드 실행해주세요 되는데 콜백함수 대신 then 사용해도 상관없음
  db.collection("chatroom")
    .insertOne(saveData)
    .then((result) => {
      res.send("채팅데이터 저장 성공했습니다.");
    });
});

app.get("/chat", 로그인했니, (req, res) => {
  // member: [어쩌구, 저쩌구] => array 안에 이렇게 저장된거 찾기도 가능
  db.collection("chatroom")
    .find({ member: req.user._id })
    .toArray()
    .then((result) => {
      res.render("chat.ejs", { data: result });
    });
});

app.post("/message", 로그인했니, (req, res) => {
  const saveData = {
    parent: ObjectId(req.body.parent),
    content: req.body.content,
    userid: req.user._id,
    date: new Date(),
  };

  db.collection("message")
    .insertOne(saveData)
    .then(() => {
      console.log("DB저장성공");
      res.send("DB저장성공");
    })
    .catch(() => {
      console.log("DB저장실패");
    });
});

// get요청일 때 서버로 데이터 전송하는 방법 1. URL 파라미터 사용 2. query string 사용
app.get("/message/:id", 로그인했니, function (req, res) {
  // GET, POST는 HTTP 요청이라고도 부름 => HTTP 요청 시 몰래 전달되는 정보들도 있음(유저의 언어, 브라우저정보, 가진 쿠키, 어디서왔나 등)
  // 이런 정보는 Header라는 공간 안에 담겨있음
  // 근데 Header를 이렇게 수정해주세요 하면 이제 /message/:parentid로 get요청하면 실시간 채널이 오픈됨 (event stream이라고도 부름)
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  console.log(req.params.id);
  // ObjectId로 저장해서 찾을 때도 ObjectId로 찾아야 함
  db.collection("message")
    .find({ parent: ObjectId(req.params.id) })
    .toArray()
    .then((result) => {
      console.log("채팅가져오기성공");
      // 일반 GET, POST 요청은 1회 요청 시 1회 응답만 가능함
      // 근데 위에 처럼 Header를 수정하고 res.write하면 여러번 응답가능함
      // 규칙이 있음
      // => 유저에게 데이터 전송은
      // => event: 보낼데이터이름\n
      // => data: 보낼에디터\n\n
      // (참고)서버에서 실시간 전송 시 문자자료만 전송가능
      res.write("event: test\n");
      res.write(`data: ${ JSON.stringify(result) }\n\n`);
    });

  // DB는 수동적이라 DB가 업데이트 되면 유저에게 쏴주세요~ 이런거 잘 못함
  // MongoDB의 Change Stream 설정해놓으면 DB변동시 서버에게 알려주고 유저에게 쏴줄 수 있음
  // Change Stream 설정법
  // 컬렉션 안의 원하는 document만 감시하고 싶으면 $match 안에 원하는 document 값을 넣어주면 됨
  // 근데 원하는 document 값 앞에 fullDocumnet 붙여야함 안붙이면 큰일남
  // 이제 이런 document가 추가/수정/삭제되면 맨 밑 코드`가 실행됨
  const 찾을문서 = [
    { $match: { "fullDocument.parent": ObjectId(req.params.id) } },
  ];
  // .watch() 붙이면 DB가 실시간으로 감시해줌
  // 해당 컬렉션에 변동이 생기면 맨 밑 코드가 실행됨
  const changeStream = db.collection("message").watch(찾을문서);
  changeStream.on("change", (result) => {
    console.log("값이 변경됨");
    // result에 추가/수정/삭제 값이 담겨있음
    // 만약 추가된 document를 출력해보려면 result.fullDocument 하면됨
    console.log(result.fullDocument);
    res.write("event: test\n");
    // 서버에서 document 다 찾아서 보낼 때 [{},{},{}..] 이런 모양이었으니까 result.fullDocument만 쓰면 obj값이니까 arr를 추가해서 통일해주자
    const 추가된문서 = [result.fullDocument];
    res.write(`data: ${ JSON.stringify(추가된문서) }\n\n`);
  });
});
