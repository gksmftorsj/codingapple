let 이름: string = "kim";
이름 = 123;

let 이름1: string[] = ["kim", "park"];
let 이름2: string[] = [123, "park"];
let 이름3: { name: string; age: number } = { name: "kim", age: "23" };
// ?는 age라는 속성이 들어올 수도 있고 안들어올 수도 있고 근데 들어오면 type은 number
let 이름4: { name: string; age?: number } = { name: "kim" };

// 다양한 타입이 들어올 수 있게 하러면 Union type
let 이름5: string | number = "kim";

// 어떤 타입의 값이라도 들어올 수 있게 하려면 any, known
// unknown 타입이 any 타입보다 안전함 any를 쓰면 다른 변수도 쉴드를 해제함
// unknown 타입은 다른 변수에 영향을 안줘서 더 안전함
let 이름6: any;
let 변수1: string = 이름6;

let 이름7: unknown;
let 변수2: string = 이름7;

// 타입스크립트의 엄격함에 대해 => 간단한 수학연산도 같은 타입이어야함
// any, number, bigint 타입만 뺄셈 가능 unknown 타입은 수학연산 불가능
이름6 - 1;
이름7 - 1;

// 왜 타입이 맞는데 +1이 안되는 것? => 타입스크립트는 타입 엄격한거 좋아한다고 했잖음
// string 타입 + 1 => 허용, number 타입 + 1 => 허용, string | number + 1 => 안돼
let 나이: string | number;
나이 + 1;

let 나이1: string;
나이1 + 1;

let 숫자 = "123";
숫자 + "1";

// 타입은 변수에 담아 사용할 수 있음 => 타입작명 시 대문자로 작명함
type MyType = string | number;

let 이름8: MyType = "park";

// 이 함수는 파라미터로 number 타입, return 값으로 number 타입이어야함
function 함수(x: number): number {
  return x * 2;
}

// array에 쓸 수 있는 tuple 타입 => 무조건 array 첫 번째에는 number 타입이, 두 번째에는 boolean 타입이 와야함
type Member = [number, boolean];
let john: Member = [123, true];

// object에 타입지정해야할 속성이 너무 많으면 type을 따로 생성하기
type Member1 = {
  // 글자로 된 모든 object 속성의 타입은: string 이다.
  [key: string]: string;
};

let eva: Member1 = { name: "kim", age: 123 };

// class 타입지정 가능
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

type Project = {
  member: string[];
  days: number;
  started: boolean;
};

let project: Project = {
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

let user: string = "kim";
let age: undefined | number = undefined;
let married: boolean = false;
let 철수: [string, undefined | number, boolean] = [user, age, married];

// (숙제2) 학교라는 변수에 타입지정해보십시오.

type 학교 = {
  score: (number | boolean)[];
  teacher: string;
  friend: string | string[];
};

let 학교: 학교 = {
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
function 함수2(x: number): void {
  return 1 + 1;
}

// 자바스크립트와 다른 점 => 파라미터의 타입을 지정해줬으면 파라미터에 값을 필수적으로 넣어줘야함
function 함수3(x: number): number {
  return x;
}
함수3();
