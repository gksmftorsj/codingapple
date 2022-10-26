// js로 했을 때
// js는 jquery와는 달리 querySellectorAll를 사용하면 모든 요소를 다 찾기는 하지만
// index를 지정해줬을 때만 적용할 수 있기 때문에 index를 지정해주거나 forEach 또는 for of를 사용하여 모든 요소에 적용시킬 수 있음
// map은 Array를 상속받은 객체가 아니므로 map함수를 사용할 수 없음
// https://curryyou.tistory.com/202 반복문 정리
// const tab_btn = document.querySelectorAll(".tab-button");
// const tab_content = document.querySelectorAll(".tab-content");
// forEach((element, index, array) => {})

// for (let i = 0; i < tab_btn.length; i++) {
//   tab_btn[i].addEventListener("click", () => {
// tab_btn.forEach((tab_btn) => {
//   tab_btn.classList.remove("orange");
// });
// tab_content.forEach((tab_content) => {
//   tab_content.classList.remove("show");
// });
// for (element of tab_btn) {
//   element.classList.remove("orange");
// }
// for (element of tab_content) {
//   element.classList.remove("show");
// }
//     tab_btn[i].classList.add("orange");
//     tab_content[i].classList.add("show");
//   });
// }

// jquery로 했을 때
// jquery에서 $표시 sellector는 js의 querySellectorAll처럼 모든 요소를 다 찾음
// but .eq(i)사용하지 않으면 모든 요소에 적용시키기 때문에 .eq(i)를 사용하여 몇 번째 거를 적용시킬지 지정해줘야 함
// $("선택자").eq("인덱스 번호") 선택자의 인덱스 번호에 해당하는 요소를 찾는다.
// 양수는 기존 0부터 앞에서부터 순서대로
// 음수는 -1은 뒤에서 첫 번째 -2는 뒤에서 두 번째
const tab_btn = $(".tab-button");
const tab_content = $(".tab-content");

function tapOpen(i) {
  tab_btn.removeClass("orange");
  tab_content.removeClass("show");
  tab_btn.eq(i).addClass("orange");
  tab_content.eq(i).addClass("show");
}

// for (let i = 0; i < tab_btn.length; i++) {
//   tab_btn.eq(i).on("click", () => {
//     tapOpen(i);
//   });
// }

// 이벤트리스너를 줄이면 램 용량을 덜 잡아먹어 여유가 생기는 이점이 있음
// 부모태그에 클릭 시 발생하는 이벤트 버블링을 활용하여 이벤트리스너를 줄일 수 있음
$(".list").on("click", (e) => {
  // for (let i = 0; i < tab_btn.length; i++) {
  //   if (e.target === tab_btn[i]) {
  //     tapOpen(i);
  //   }
  // }
  // data-"자료이름"="입력값" => 정보 숨겨두기
  // 찾을 때는 셀럭터.dataset.자료이름으로 찾으면 됨
  // ex) document.querySellector(".tab-button").dataset.id
  // 레전드... 한 줄이면... 되네...
  tapOpen(parseInt(e.target.dataset.id));

  // dataset 옛 브라우저까지 호환 잘되는 jQuery 함수
  // $(셀렉터).data('데이터이름', '값') 저장 후
  // $(셀렉터).data('데이터이름') 출력
  // $(".tab-button").data("id", "1");
  // console.log($(".tab-button").data("id"));
});

const car1 = {
  name: "소나타",
  price: [50000, 3000, 4000],
  color: "white",
};

// 객체 데이터값 불러올 떄 .말고 []사용하면 변수사용 가능
const na = "na";
$(".car-title").html(car1[`${na}me`]);
$(".car-price").html(car1.price[0]);

// jQuery에서는 val(), js에서는 value
// e.target.value or e.currentTarget
// select 조작할 때 input or change event 발생

// js html 생성법
// 1. createElement 후에 속성이나 값 설정 후 appendChild 하기
// 2. insertAdjacentHTML(position, text) 하기
// => text는 HTML 또는 XML로 해석될 수 있는 문자열(html code)여야 한다.
// => ex) const title = "<p>제목</p>";
// => document.querySelector("~~~").insertAdjacentHTML("beforeend", title);
// => 'beforebegin' => element 앞에
// => 'afterbegin' => element 안에 가장 첫번째 child
// => 'beforeend' => element 안에 가장 마지막 child
// => 'afterend' => element 뒤
// 3. innerHTML은 내부요소 전체 갈아엎는 것 위에 2개는 내부요소에 추가하는 것

// jQuery html 생성법
// 1. ex) const title = "<p>제목</p>";
// => document.querySelector("~~~").append(title);
// => js에서 document.createElement 후에 appendChild 하는 것과 마찬가지임
// 2. html은 내부요소 전체 갈아엎는 것 위에 1개는 내부요소에 추가하는 것

const select_product = $(".form-select").eq(0);
const select_size = $(".form-select").eq(1);

select_product.on("input", () => {
  const cap = ["SS", "S", "M", "L", "XL", "XXL"];
  const shirts = [95, 100, 105, 110];
  const pants = [28, 30, 32, 34];

  select_size.removeClass("form-hide");
  if (select_product.val() === "모자") {
    select_size.html("");
    cap.forEach((item) => {
      select_size.append(`<option>${item}</option>`);
    });
  } else if (select_product.val() === "셔츠") {
    select_size.html("");
    shirts.forEach((item) => {
      select_size.append(`<option>${item}</option>`);
    });
  } else if (select_product.val() === "바지") {
    select_size.html("");
    pants.forEach((item) => {
      select_size.append(`<option>${item}</option>`);
    });
  } else {
    select_size.addClass("form-hide");
  }
});

// for in 문법
// const obj = ["a", "b"];
// for (const ?? in obj) {
//   console.log(obj[??]);
// }
// => array일 때 for in을 사용하면 ??값은 index를 값이 된다. obj[??]값에는 각 배열의 value값이 된다.

// const obj = { name: "kim", age: 20 };
// for (const ?? in obj) {
//   console.log(??);
// }
// => object일 때 for in을 사용하면 ??값은 obj의 key 값이 된다. 그래서 obj의 key값을 뽑고 싶으면 ??만 사용하면 되고 value값을 뽑고 싶으면 obj[??]를 사용하면 된다.

// 1.
// const 출석부 = ["흥민", "영희", "철수", "재석"];

// function 이름찾기(name) {
//   for (let i = 0; i < 출석부.length; i++) {
//     if (출석부[i] === name) {
//       console.log("있어요");
//     }
//   }
// }

// 2.
// for (let i = 2; i <= 9; i++) {
//   for (let j = 1; j <= 9; j++) {
//     console.log(i * j);
//   }
// }

// 3.
// function 평균점수계산기(existingScore, newScore) {
//   let sum = 0;
//   for (let i = 0; i < existingScore.length; i++) {
//     sum += existingScore[i];
//   }
//   const existingAverage = sum / existingScore.length;
//   if (existingAverage < newScore) {
//     console.log(
//       `평균보다 ${newScore - existingAverage}점이 올랐네요 축하합니다`
//     );
//   } else if (existingAverage === newScore) {
//     console.log("평균과 같네요 분발하세요");
//   } else {
//     console.log(
//       `평균보다 ${existingAverage - newScore}점이 떨어졌네요 재수추천`
//     );
//   }
// }

// 평균점수계산기([40, 40, 40], 20);
