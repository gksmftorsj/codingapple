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

// 타입지정을 안해줬더니 터미널에 에러가 나는군요.

// 에러안나게 학교라는 변수에 타입좀 지정해줍시다.

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

// (숙제1) 이름을 파라미터로 입력하면 콘솔창에 "안녕하세요 홍길동"을 출력해주고

// 아무것도 파라미터로 입력하지 않고 함수를 사용하면 "이름이 없습니다" 를 출력하는 함수를 만들어봅시다.
// 파라미터와 return 타입지정도 잘 해봅시다. 

function sayHi(이름?: string): void{
  if(이름){
    console.log("안녕하세요 홍길동님 " + "저는 " + 이름 + "입니다.")
  }else{
    console.log("이름이 없습니다.")
  }
}
sayHi("이름");
sayHi();

// (숙제2) 함수에 숫자 또는 문자를 집어넣으면 자릿수를 세어 출력해주는 함수를 만들어보십시오.

// 예를 들어 '245' 이런 문자를 입력하면 3이 return 되어야합니다.
// 숫자도 마찬가지로 9567 이런 숫자를 입력하면 4가 return 되어야합니다.
// 숫자 또는 문자 이외의 자료가 들어오면 안됩니다. 

function 자리수세기(자리수: string | number): number{
  if(typeof 자리수 === "string"){
    return 자리수.length;
  } else{
    return 자리수.toString().length;
  }
}
console.log(자리수세기(123));
console.log(자리수세기("123"));


// (숙제3) 결혼 가능 확률을 알려주는 함수를 만들어봅시다.

// 1. 함수의 파라미터로 월소득(만원단위), 집보유여부(true/false), 매력점수 ('상' or '중' or '하') 를 입력할 수 있어야합니다. 
// 2. 월소득은 만원 당 1점, 집보유시 500점 & 미보유시 0점, 매력점수는 '상'일 때만 100점으로 계산합니다. 
// 3. 총 점수가 600점 이상일 경우 "결혼가능"을 return 해줘야합니다. 그 외엔 아무것도 return하지 않습니다.

// (예시)
// 결혼가능하냐(700, false, '중') 이렇게 사용할 경우 "결혼가능"을 return 해줍니다.
// 결혼가능하냐(100, false, '상') 이렇게 사용할 경우 아무것도 return되지 않습니다.

  function 결혼가능하냐(월소득: number, 집보유여부: boolean, 매력: string): string{
    let 총점수: number = 0;
    총점수 += 월소득;
    if(집보유여부 === true){
      총점수 += 500;
    } else{
      총점수 += 0;
    }
    if(매력 === "상"){
      총점수 += 100;
    } else{
      총점수 += 0;
    }
    if(총점수 >= 600){
      return "결혼가능";
    }
  }
  
  console.log(결혼가능하냐(700, false, '중'));
  console.log(결혼가능하냐(100, false, '상'));

//   (숙제1) 숫자여러개를 array 자료에 저장해놨는데
// 가끔 '4', '5' 이런 식의 문자타입의 숫자가 발견되고 있습니다.
// 이걸 클리닝해주는 함수가 필요합니다. 
// 클리닝함수( ['1', 2, '3'] ) 이렇게 숫자와 문자가 섞인 array를 입력하면
// [1,2,3] 이렇게 숫자로 깔끔하게 변환되어 나오는 클리닝함수를 만들어오고 타입지정까지 확실히 해보십시오. 모르는 부분은 구글검색해도 봐드림 

function 클리닝함수(x:number []):void {
  let 클리닝완료된거: number[] = [];
  x.forEach((y)=>{
    if(typeof y === "string"){
      클리닝완료된거.push(b)
    }
  })
}

클리닝함수(["1", 2, "3"]);

// (숙제2) 다음과 같은 함수를 만들어보십시오.

// let 철수쌤 = { subject : 'math' }
// let 영희쌤 = { subject : ['science', 'english'] }
// let 민수쌤 = { subject : ['science', 'art', 'korean'] }

// 지금 여러 변수에 선생님이 가르치고 있는 과목이 저장이 되어있습니다. 
// 과목 1개만 가르치는 쌤들은 문자 하나로 과목이 저장이 되어있고
// 과목 2개 이상 가르치는 쌤들은 array 자료로 과목들이 저장되어있습니다. 

// 철수쌤같은 선생님 object 자료를 집어넣으면 
// 그 선생님이 가르치고 있는 과목중 맨 뒤의 1개를 return 해주는 함수를 만들어봅시다.
// 그리고 타입지정도 엄격하게 해보도록 합시다. 

// (동작예시)

// 만들함수( { subject : 'math' } )  //이 경우 'math'를 return
// 만들함수( { subject : ['science', 'art', 'korean'] } ) //이 경우 'korean'을 return
// 만들함수( { hello : 'hi' } )  //이 경우 타입에러 나면 됩니다 
// Q. 이 자료가 array type 인지 어떻게 검사하냐고요? 구글에 물어보시면 됩니다. 