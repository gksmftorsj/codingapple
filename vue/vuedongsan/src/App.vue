<template>
  <!-- 컴포넌트에 데이터 전달 위해 props 사용하기 -->
  <!-- 1. 밑에 데이터 골라서 보내셈 => <자식:작명="데이터이름">-->
  <!-- props 보낼 때 다양한 자료형 입력가능 => :작명="Array, Object" -->
  <!-- 문자형 => v-bind 없이 그냥 입력가능 => 작명="문자자료" -->
  <!-- 숫자형 => 작명="숫자자료" -->
  <!-- 하단에 있는 데이터인 오브젝트.title, 오브젝트.age 각각 props로 전송하려면 -->
  <!-- <컴포넌트 v-bind="오브젝트" or :작명="오브젝트.title" :작명="오브젝트.age" /> -->
  <!-- class명을 조건부로 넣으려면 {클래스명:조건} -->
  <!-- 조건이 true면 end 클래스 작동 false면 미작동  -->
  <!-- <div class="start" :class="{ end: 모달창열렸니 }"> -->
  <!-- </div> -->
  <!-- Vue에서는 <Transition> 이용하면 애니메이션 쉽게 줄 수 있음 -->
  <!-- 1. 애니메이션 주고싶은 요소를 <Transition title="작명">으로 감싸기 -->
  <!-- 보통 v-if, v-else UI에 많이 줌 -->
  <Transition name="fade">
    <Modal
      :원룸들="원룸들"
      :누른거="누른거"
      :모달창열렸니="모달창열렸니"
      @closeModal="closeModal"
    />
  </Transition>
  <!-- v-if="조건식" => 조건식이 참일 때만 HTML보여줌-->
  <!-- 밑에 있는 모달창열렸니 data가 true면 보여줄것임 -->
  <!-- <div class="black-bg" v-if="모달창열렸니 === true">
    <div class="white-bg">
      <img :src="원룸들[누른거].image" style="width: 100%" />
      <h4>{{ 원룸들[누른거].title }}</h4>
      <p>{{ 원룸들[누른거].content }}</p>
      <p>{{ 원룸들[누른거].price }} 원</p>
      <button @click="closeModal">닫기</button>
    </div>
  </div> -->

  <!-- 자주 변하지 않는 데이터들은 데이터바인딩할 필요없으니까 하지말자 -->
  <!-- (충격) HTML 속성도 데이터바인딩 가능 => :속성="데이터이름"-->
  <!-- <h4 :style="스타일">원룸샵</h4> -->

  <div class="menu">
    <!-- Vue의 HTML반복문 => <태그 v-for="작명(any) in 몇회" :key=""> => 모든 HTML 요소에 달수있음 -->
    <!-- 반복문 쓸 때 :key 안쓰면 에러남 => 반복문 돌린 요소를 컴퓨터가 구분하기 위해 씀 -->
    <!-- <a v-for="작명(any) in 3" :key="작명(any)">Home</a> -->
    <!-- 몇회자리에 데이터도 집어넣기 가능함 => 몇회자리에 데이터 집어넣으면 데이터 개수가 횟수가 됨-->
    <!-- Vue 반복문 특) array/object 집어넣기 가능 -->
    <!-- 자료형을 집어넣어주면 자료형의 개수만큼 반복해줌 -->
    <!-- 그럼 작명한 변수는 데이터안의 자료가 됨 즉 차례대로 메뉴들 값이 됨 -->
    <!-- Vue 반복문 특) 변수 작명 2개까지 가능 (작명(and), 작명(any))-->
    <!-- 두 번째 parameter에는 index번호가 들어옴 0, 1, 2, 3 ... -->
    <a v-for="(작명, i) in 메뉴들" :key="i">{{ 작명 }}</a>
  </div>

  <!-- 축약해둔 컴포넌트 쓰는 법 -->
  <!-- 1. vue파일 import해오고 -->
  <!-- 2. components:{}에 등록하고 -->
  <!-- 3. <쓰셈/> -->
  <Discount v-if="showDiscount === true" :discount="discount" />

  <!-- 가격순정렬 버튼 만들기 -->
  <!-- 쌩 js라면 원룸들 데이터를 정렬하고 HTML에 반영해주세요 해야함 -->
  <!-- 근데 Vue라면 원룸들 데이터를 정렬하면 끝임 -->

  <div class="btn-wrapper">
    <button @click="sortDefault">기본순정렬</button>
    <button @click="alphabetSort">가나다순정렬</button>
    <button @click="priceSortedLow">가격낮은순정렬</button>
    <button @click="priceSortedHigh">가격높은순정렬</button>
  </div>

  <!-- @openModal => 자식이 openModal 이름의 메세지 보내면 자바스크립트 실행해주셈~ -->
  <!-- @작명한거="" -->
  <!-- ex) @openModal="모달창열렸니 = open" -->
  <!-- Card-openModal에서 보낸 원룸.id값은 $event 변수에 담겨있으니까 알아서 잘 쓰도록 하자 -->
  <Card
    @increase="increase(i)"
    @openModal="openModal(i, $event)"
    :원룸="원룸들[i]"
    :신고수="신고수[i]"
    v-for="(원룸, i) in 원룸들"
    :key="i"
  />

  <!-- 밑에 있는 데이터를 HTML에 꽂아넣고 싶으면 {{데이터이름}} -->
  <!-- Vue는 신기해서 data를 변경하면 data와 관련된 HTML에도 실시간으로 반영됨 -->
  <!-- {{데이터바인딩}}을 사용해서 실시간 자동 렌더링을 쓰자 -->
  <!-- 스무스하게 web-app처럼 부드럽게 변경됨 -->
  <!-- 그러니까 자주 변할거같은 데이터들은 밑에 보관하고 HTML에 {{꽂아넣자}} -->
  <!-- 데이터값과 {{데이터바인딩}}값이 같을 때 => 역삼동원룸[i]가 되어서 => "역"값만 나옴 -->
  <!-- 그러므로 제대로 쓰려면 v-for에서 작명할 때 {{데이터바인딩}}값과 다르게 써야함 -->
  <!-- <div v-for="(data, i) in 원룸들" :key="i"> -->
  <!-- src에 있는거 가져올 때 경로는 ./부터 -->
  <!-- v-bind 약자가 :src임 -->
  <!-- v-bind인 :src를 사용하면 js에서 만든 함수사용 가능함 -->
  <!-- <img @click="test" :src="원룸들[i].image" class="room-img" />
    <h4 @click="openModal(i)">{{ 원룸들[i].title }}</h4>
    <p>{{ 원룸들[i].price }}원</p> -->
  <!-- 전통방식은 onclick="" -->
  <!-- Vue방식은 v-on:click="자바스크립트~~" or @click="자바스크립트~~" -->
  <!-- v-on의 약자가 @임-->
  <!-- 쌩js 스타일 -->
  <!-- 1. 버튼누르면 숫자 찾아서 +1 -->
  <!-- 2. 그리고 +1된걸 HTML에 반영해주셈 -->
  <!-- Vue 스타일 -->
  <!-- 1. 버튼 누르면 관련된 데이터만 +1(Vue는 데이터 변하면 HTML에 실시간으로 바로 반영됨) -->
  <!-- <button @click="increase(i)">허위매물신고</button>
    <span>신고수: {{ 신고수[i] }}</span>
  </div> -->
</template>

<script>
// import/export 문법 쓰는 법
// import 작명 from "./assets/oneroom.js"
// import 하고 사용 안하면 에러뜸

//그냥 export만 하는 문법 쓰는 법
// import 쓸 때는 변수명 그대로 가져와야 함
// import {apple, apple2} from "./assets/oneroom.js"

import data from "./assets/oneroom.js";
import Discount from "./components/Discount.vue";
import Modal from "./components/Modal.vue";
import Card from "./components/Card.vue";

// {{데이터바인딩}} = JS데이터를 HTML에 꽂아넣는 문법
// 원래 쌩JS로 하려면 document.getElementById().innerHTML = ???
export default {
  title: "App",
  // 데이터바인딩하려면 데이터 보관함부터 있어야됨
  // data만들 땐 데이터 사용하는 곳들 중 최상위 컴포넌트에 만드셈
  data() {
    return {
      discount: 30,
      showDiscount: true,
      // array/Object 데이터의 각각 별개의 사본을 만들려면 [...array자료]
      원룸들오리지널: [...data],
      오브젝트: { title: "kim", age: 20 },
      누른거: 0,
      원룸들: [...data],
      // 동적인 UI 만드는 법
      // 1. UI의 현재 상태를 데이터로 저장해둠 => 모달창이 지금 어떻게 보여야함?
      // 2. 데이터에 따라 UI가 어떻게 보일지 작성
      모달창열렸니: false,
      신고수: [0, 0, 0, 0, 0, 0],
      // 여기에 데이터보관하셈 근데 데이터는 object 자료로 저장해두셈
      price: [80, 70, 60],
      // 스타일 : "color:blue",
      메뉴들: ["Home", "Shop", "About"],
      products: ["역삼동원룸", "천호동원룸", "마포구원룸"],
    };
  },
  // Vue에서 함수만들고 싶으면 methos:{함수이름(){}}안에 만드셈
  // 데이터든 props든 data든 $변수든 함수안에서 쓸 땐 this. 붙이셈
  methods: {
    increase(i) {
      this.신고수[i]++;
    },
    getSrc(i) {
      // v-bind함수를 가지고 src속성에 경로 넣어주기
      // 그냥 return 해주면 string이기 때문에 require()으로 묶어주어야 한다.
      return require(`./assets/room${i}.jpg`);
    },
    openModal(i, cardData) {
      this.모달창열렸니 = true;
      this.누른거 = i;
      console.log(cardData);
    },
    closeModal() {
      this.모달창열렸니 = false;
    },
    sortDefault() {
      // sort()하면 원본이 변형됨 / map(), filter()등은 원본을 보존해줌
      // 요즘은 원본데이터 보호하는게 유행
      // 원래 데이터가 필요하면 오리지널 사용하기
      // 근데 작동을 제대로 안합니다. 왜냐면 array나 object에다가 = 등호로 뭔가를 집어넣으시면 등호 왼쪽 오른쪽에 있는 array/object는 서로 값을 공유해주세요~ 라는 뜻이기 때문입니다. 왜 그런지는 reference data type을 찾아보도록 합시다. 그래서 아무튼 저렇게 sortDefault()를 디자인해놓으면 안된다는 소리입니다.
      //그래서 우리가 array 자료를 복사하거나 아니면 값공유가 일어나지 않게 집어넣고 싶으면 [...array자료] 이렇게 사용합니다. 그래서 저렇게 온갖 곳에 다 사용해봤습니다. 그러면 안전하게 원본 array를 집어넣을 수 있습니다. 되돌리기 버튼 잘 동작할 듯요
      this.원룸들 = [...this.원룸들오리지널];
    },
    priceSortedHigh() {
      // sort는 문자순 정렬이기 때문에 숫자순 정렬을 하기 위해서는 아래처럼 작성해야함
      // const arr = [3, 5, 2];
      // arr.sort(function (a, b) {
      //   // a와 b에는 배열 내 숫자들이 들어오고(3, 5 or 5, 2 or 3, 2) a-b했을 때 음수면 a를 왼쪽으로, 양수면 오른쪽으로 보내주세요 하는 코드임
      //   // so a-b하면 오름차순정렬, b-a하면 내림차순정렬임
      //   return a - b;
      // });
      // console.log(arr);

      // 원룸들 데이터를 가격순 정렬?
      // 원룸들: [{},{},{},{},{},{}] => obj - obj = NaN값임
      this.원룸들.sort(function (a, b) {
        return b.price - a.price;
      });
    },
    priceSortedLow() {
      this.원룸들.sort(function (a, b) {
        return a.price - b.price;
      });
    },
    alphabetSort() {
      this.원룸들.sort(function (a, b) {
        // 오름차순 정렬
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        // 내림차순 정렬
        // return a.title > b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    },
  },
  // lifecycle hook 쓰려면
  // mount = 컴포넌트가 HTML에 다 장착되고 나서 잘 보이는 상태
  // 모든 컴포넌트에 lifecycle hook을 사용할 수 있음
  // App.vue에서 mounted()를 사용하면 App.vue가 mount되고 나서 코드실행해주세요라는 뜻임
  // mounted() {
  //   setTimeout(() => {
  //     // 화살표함수를 쓰면 바깥 this를 제대로 가져다 쓸 수 있음
  //     this.showDiscount = false;
  //   }, 2000);
  // },
  // 서버에서 데이터 가져올 때도 lifecycle hook 안에서 코드를 짬
  // created() {
  //   // 서버에서 데이터 가져오는 코드~
  // },
  mounted() {
    setInterval(() => {
      this.discount--;
      if (this.discount === 0) {
        this.showDiscount = false;
      }
    }, 1000);
  },
  components: {
    // 왼쪽은 언제나 자유작명
    // 오른쪽 왼쪽 이름같으면 그냥 이름 하나만 쓰면됨
    // ex) Discount : Discount => Discount,
    Discount,
    Modal,
    Card,
  },
};
</script>

<style>
/* .start {
  opacity: 0;
  Transition: all 1s;
}

.end {
  opacity: 1;
} */

/* 2. <Transition> 사용 시 class명 3개 작성 */
/* => 입장시 enter ."작명"-enter-from, active, to */
/* 시작시 스타일 */
.fade-enter-from {
  opacity: 0;
  /* transform: translateY(-1000px); */
}
/* Transition 스타일 */
.fade-enter-active {
  transition: all 1s;
}
/* 끝날시 스타일 */
.fade-enter-to {
  opacity: 1;
  /* transform: translateY(0px); */
}

/* => 퇴장시 leave ."작명"-leave-from, active, to */
/* 시작시 스타일 */
.fade-leave-from {
  opacity: 1;
}
/* Transition 스타일 */
.fade-leave-active {
  transition: all 1s;
}
/* 끝날시 스타일 */
.fade-leave-to {
  opacity: 0;
}

body {
  margin: 0px;
}

div {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a {
  color: white;
  padding: 10px;
}

.btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.btn-wrapper button {
  margin-right: 10px;
}
</style>
