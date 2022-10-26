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
// 함수 내의 parameter는 변수 작명이랑 똑같기 때문에 타입을 지정해줘야 한다 변수도 그냥 타입 안정해주고 만들면 any 타입이 자동할당됨 그럼 지정이 된 것이므로 필수적으로 넣어줘야함
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
// 파라미터가 선택사항일 때는 '?: 타입' 형식으로 작성해주면 된다
// ?연산자는 들어올수도 있다~라는 뜻이긴 한데 
// 실제로는 '?: 타입' === ': 타입 | undefined'이다.  
// 그래서 만약 함수 안 파라미터에 값을 넣지 않고 console.log(파라미터)를 출력하면 undefined값이 출력된다.
function 함수4(x) {
    return x;
}
함수4();
// 애매한 타입들은 미리 타입검사필요 => Narrowing
// 어떤 변수가 타입이 아직 불확실하면 if문 등으로 Narrowing 해줘야 조작가능
function 함수5(x) {
    if (typeof x === "string") {
        return x + "1"; // => string 타입임
    }
    else {
        return x + 1;
    }
}
console.log(함수5("5"));
// (주의) else, else if 안쓰면 에러로 잡아줄 수도 있음 그러니까 if문 썼으면 끝까지 써야 안전함 
function 함수6(x) {
    let array = [];
    if (typeof x === "number") {
        array[0] = x;
    }
    else {
    }
    // Narrowing으로 판정해주는 문법들
    // in => 속성명 in 오브젝트자료
    // instanceof => 인스턴스 instanceof 부모
    // => 그냥 현재 변수의 타입이 뭔지 특정지을 수 있기만 하면 다 인정해줌
    // 아니면 assertion 문법(타입 덮어쓰기) => x는 number 타입됨 => 개편하네 앞으로 자주 쓴다 => 사수한테 빠따맞음 => 빠다 안막지 위한 assertion 문법의 용도
    array[0] = x;
    // 1. Narrowing 할 때 씁니다.
    // => 여러개 복잡한 union 타입을 하나로 확정짓고 싶을 때 사용 => 근데 타입을 a에서 b로 변경으로는 X
    let 이름 = "kim";
    이름;
    // 2. 무슨 타입이 들어올지 100% 확실할 때 쓰셈
    // 함수6()의 파라미터에 무조건 number가 들어올 것이 확실할 때 as number 사용하면 됨
    // 근데 as number를 하고 문자 넣어도 아무일 없음(assertion 해놓으면 이런 버그를 캐치못함)
    // 그러니까 무조건 1000000% 아니면 그냥 if쓰자
    // 남이 짠 코드 수정할 때, 왜 타입에러가 나는지 모르겠을 때, 비상용일 때만 사용합시다.
    // 옛날 as 문법은 <number>이름
}
함수6("123");
