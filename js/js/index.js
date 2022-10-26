$(".navbar-toggler").on("click", () => {
  $(".list-group").toggleClass("show");
});

$("#login").on("click", () => {
  $(".black-bg").addClass("show-modal");
});

$("#close").on("click", () => {
  $(".black-bg").removeClass("show-modal");
});

// 상위요소의 이벤트가 있을 시에 하위요소에도 그 이벤트가 전해짐
// 즉 상위요소에 클릭 이벤트가 있다면 하위요소를 클릭해도 상위요소를 클릭한 것과 같은 이벤트가 발생함 이게 바로 이벤트 버블링 현상
// but 하위요소의 이벤트가 있을 시에는 상위요소가 동작해도 이벤트가 전해지지 않음
$(".black-bg").on("click", (e) => {
  // e.target => 이벤트가 발생한 곳
  // e.currentTarget => 이벤트리스너가 달린 곳
  // this => 여기서 썼을 때 이벤트리스너가 달린 곳
  // 화살표 함수(()=>{})을 쓰면 함수 안의 뜻이 달라질 수 있기 때문에 e.currentTarget과 같은 의미로 사용하려면 일반 함수(function(){})을 사용해야 한다.
  // e.preventDefault() => 새로고침 막기
  // e.stopPropagation() => 내 상위요소로 이벤트 버블링 막아줌
  // is() 메서드는 선택한 요소 중 하나가 is( 선택한 Element )와 일치하는지 확인한다. 결과값은 참(true)/거짓(false)을 나타낸다.
  // 만약 is()의 인자로 들어있는 함수가 true를 반환한다면 is()함수도 true를 반환한다.
  // https://findfun.tistory.com/204 => .is()설명
  // console.log(e.target);
  // console.log(e.currentTarget);
  // console.log($(".black-bg"));
  // console.log(document.querySelector(".black-bg"));
  // console.log($(e.target)[0]);
  // console.log($(".black-bg")[0]);
  // if ($(e.target)[0] === $(".black-bg")[0]) {
  //   $(".black-bg").removeClass("show-modal");
  // }
  // if (e.target === e.currentTarget) {
  //   $(".black-bg").removeClass("show-modal");
  // }
  if ($(e.target).is($(".black-bg"))) {
    $(".black-bg").removeClass("show-modal");
  }
});

let count = 0;

$(".badge").on("click", () => {
  count++;
  if (count % 2 != 0) {
    $(".badge").text("Dark 🔄");
  } else {
    $(".badge").text("Light 🔄");
  }
});

// let num = 4;

// const timeout = setTimeout(() => {
//   $(".alert").removeClass("alert-hidden");
//   clearTimeout(timeout);
//   const interval = setInterval(() => {
//     if (num > 0) {
//       $("#alert-num").text(num);
//       num--;
//     } else {
//       $(".alert").addClass("alert-hidden");
//       clearInterval(interval);
//     }
//   }, 1000);
// }, 3000);

// /[a-zA-Z]/.test('반가워요a') => 아무 알파벳 하나라는 뜻임
// /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/.test('반가워요') => 아무 한글 하나라는 뜻임
// /[0-9]/.test("123") => 아무 숫자 하나라는 뜻임
// /\S/.test('abcde') => \S 는 특수문자 포함 아무문자 1개라는 뜻임
// /^a/.test('abcde') => a로 시작하는지 검사할 수 있음
// /e$/.test('abcde') => e로 끝나는지 검사할 수 있음
// /(e|f)/.test('abcde') => e 또는 f중 아무거나 한 문자가 있나 검사가능함 정규식에선 괄호맘대로 칠 수 있음
// /a+/ =>+ 기호를 붙여주면 뒤에 오는 글자들도 a와 일치하면 반복해서 쭉 찾아달라는 뜻임 왜냐하면 /a/는 a를 다 찾으라는게 아니라 a 한개를 찾으라는 뜻임 aaaaa 이런걸 찾고 싶으면 /a+/ 쓰면 됨
// /\S+t/ => 모든 문자 여러개 다음에 t라는 글자가 있냐를 검사해주는 정규식
// /\S+@\S+\.\S+/ => 이메일 정규식 +써서 모든 문자 계속 찾은 뒤 @와 .사용할 수 있도록 하기 and \. 이라는 기호는 왜 이렇게 썼냐면 마침표는 정규식에서 특수한 문법이기 때문에 마침표 문법을 쓰는게 아니라 진짜 마침표를 찾아달라라는 의미로 쓰려면 백슬래시를 앞에 붙여야 함

$("form").on("submit", (event) => {
  event.preventDefault();
  const email_value = document.getElementById("email").value;
  const password_value = document.getElementById("password").value;
  if (email_value === "") {
    alert("아이디 입력안함");
  }
  if (!/\S+@\S+\.\S+/.test(email_value)) {
    alert("이메일 형식아님");
  }
  if (!/[A-Z]/.test(password_value)) {
    alert("비밀번호 형식아님");
  }
});

let 지금사진 = 1;
$(".slide-1").on("click", () => {
  $(".slide-container").css("transform", "translateX(0vw)");
  지금사진 = 1;
});
$(".slide-2").on("click", () => {
  $(".slide-container").css("transform", "translateX(-100vw)");
  지금사진 = 2;
});
$(".slide-3").on("click", () => {
  $(".slide-container").css("transform", "translateX(-200vw)");
  지금사진 = 3;
});
$(".next").on("click", () => {
  if (지금사진 < 3) {
    $(".slide-container").css("transform", `translateX(-${지금사진}00vw)`);
    지금사진++;
  }
});
$(".before").on("click", () => {
  if (지금사진 > 1) {
    $(".slide-container").css("transform", `translateX(-${지금사진 - 2}00vw)`);
    지금사진--;
  }
});

window.addEventListener("scroll", () => {
  // window.scrollY => 스크롤 얼마나 내렸는지 볼 수 있음 But window일 때만 적용가능함
  // 그래서 일반 element의 스크롤양을 알고 싶을 땐 scrollTop을 사용해야 함
  // window.scrollTo(x, y) => 전달된 좌표로 이동하고 싶을 때 => Bootstrap설치시 스크롤을 스무스하게 처리해줌 그래서 css 제일 상단에 :root {scroll-behavior: auto;}를 적용해주면 스무스한게 없어짐
  // window.scrollBy(x, y) => 현재 좌표를 기준으로 전달된 좌표만큼 이동하고 싶을 때
});

// 실제높이(scrollHeight) - 스크롤양(scrollY or ScrollTop) === 눈에보는높이(clientHeight) => 페이지 바닥 체크
$(window).on("scroll", () => {
  if ($(window).scrollTop() > 100) {
    $(".navbar-brand").css("font-size", "20px");
  } else {
    $(".navbar-brand").css("font-size", "25px");
  }
  // $(window).scrollTop() => 현재 스크롤바 위치 출력 => scrollY와 같은 기능 + 값을 입력하면 입력값 만큼 이동시켜줌
  // jquery에서 scollY, scrollHeight, clinetHeight를 사용하려면
  // 1. $("??").[0].scrollHeight;
  // 2. $("??").prop("scrollHeight");
  // scrollTop()은 정상작동함
  const 스크롤양 = $(window).scrollTop();
  const 실제높이 = $("html")[0].scrollHeight;
  const 눈에보이는높이 = $("html")[0].clientHeight;
  if (실제높이 - 스크롤양 === 눈에보이는높이) {
    alert("페이지 다 읽음");
  }
});

$(".lorem").on("scroll", (event) => {
  // window페이지 아닐 때는 event.target 활용하기
  // 현재페이지 끝까지 스크롤 체크는 html의 실제 높이와 스크롤양을 찾으면 됨
  // scroll 다룰 때 주의점
  // 1. scroll 이벤트리스터 안의 코드는 1초 안에 60번 이상 실행되어서 컴퓨터에 많은 부담을 주기 때문에 적당히 써야 함
  // 2. 바닥체크도 여러 번 중복으로 해줄 듯
  const lorem = event.target;
  if (lorem.scrollHeight - lorem.scrollTop === lorem.clientHeight) {
    alert("약관 다 읽음");
  }
});
