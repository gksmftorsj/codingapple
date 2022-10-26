let 이름 = "kim";
이름 = 123;
let 이름1 = ["kim", "park"];
let 이름2 = [123, "park"];
let 이름3 = { name: "kim", age: "23" };
// ?는 age라는 속성이 들어올 수도 있고 안들어올 수도 있고 근데 들어오면 type은 number
let 이름4 = { name: "kim" };
// 다양한 타입이 들어올 수 있게 하러면 Union type
let 이름5 = "kim";
// 어떤 타입의 값이라도 들어올 수 있게 하려면 any, known
// unknown 타입이 any 타입보다 안전함 any를 쓰면 다른 변수도 쉴드를 해제함
// unknown 타입은 다른 변수에 영향을 안줘서 더 안전함
let 이름6;
let 변수1 = 이름6;
let 이름7;
let 변수2 = 이름7;
// 타입스크립트의 엄격함에 대해 => 간단한 수학연산도 같은 타입이어야함
// any, number, bigint 타입만 뺄셈 가능 unknown 타입은 수학연산 불가능
이름6 - 1;
이름7 - 1;
// 왜 타입이 맞는데 +1이 안되는 것? => 타입스크립트는 타입 엄격한거 좋아한다고 했잖음
// string 타입 + 1 => 허용, number 타입 + 1 => 허용, string | number + 1 => 안돼
let 나이;
나이 + 1;
let 나이1;
나이1 + 1;
let 숫자 = "123";
숫자 + "1";
let 이름8 = "park";
// 이 함수는 파라미터로 number 타입, return 값으로 number 타입이어야함
function 함수(x) {
  return x * 2;
}
let john = [123, true];
let eva = { name: "kim", age: 123 };
// class 타입지정 가능
class User {
  constructor(name) {
    this.name = name;
  }
}
let project = {
  member: ["kim", "park"],
  days: 30,
  started: true,
};
// (숙제1) 다음 변수 4개에 타입을 지정해봅시다.
// let user = 'kim';
// let age = undefined;
// let married = false;
// let 철수 = [user, age, married];
// 허전하니까 변수 4개에 타입빨리 집어넣어봅시다.
// (조건) age 변수엔 undefined 말고 숫자도 들어올 수 있습니다.
let user = "kim";
let age = undefined;
let married = false;
let 철수 = [user, age, married];
let 학교 = {
  score: [100, 97, 84],
  teacher: "Phil",
  friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];
// 타입지정을 안해줬더니 터미널에 에러가 나는군요.
// 에러안나게 학교라는 변수에 타입좀 지정해줍시다.
// 함수 내의 parameter는 변수 작명이랑 똑같기 때문에 타입을 지정해줘야 한다 변수도 그냥 타입 안정해주고 만들면 any 타입이 자동할당됨
let y;
function 함수1(x) {
  return x * 2;
}
함수1();
// void 타입에서 활용가능 => 실수로 뭔가 return 하는걸 사전에 막을 수 있음
function 함수2(x) {
  return 1 + 1;
}
// 자바스크립트와 다른 점 => 파라미터의 타입을 지정해줬으면 파라미터에 값을 필수적으로 넣어줘야함
function 함수3(x) {
  return x;
}
함수3();
