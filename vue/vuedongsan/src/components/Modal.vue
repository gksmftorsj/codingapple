<template>
  <!-- v-if="조건식" => 조건식이 참일 때만 HTML보여줌-->
  <!-- 밑에 있는 모달창열렸니 data가 true면 보여줄것임 -->
  <div class="black-bg" v-if="모달창열렸니 === true">
    <div class="white-bg">
      <img :src="원룸들[누른거].image" style="width: 100%" />
      <h4>{{ 원룸들[누른거].title }}</h4>
      <p>{{ 원룸들[누른거].content }}</p>
      <!-- 상품수량 입력기능 -->
      <!-- input에 입력한 값 알아내기 1 -->
      <!-- @input="" 입력할 때마다 뭐 실행해주셈 -->
      <!-- @change="" 입력하고 커서 다른데 찍으면 뭐 실행해주셈 -->
      <!-- $event = 쌩 js에서 e.target의 e와 같은 역할임 => so $event.target.value는 <input>에 입력한 값 -->
      <!-- <input @input="month = $event.target.value" /> -->
      <!-- input에 입력한 값 알아내기 2 -->
      <!-- 모든 input류의 html 태그(textarea, select 등)에 붙일 수 있는 v-model 사용 => @input="month = $event.target.value"의 축약버전-->
      <!-- <textarea v-model="month"></textarea> -->
      <!-- <select v-model="month">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select> -->
      <!-- checkbox는 true, false값으로 저장됨 -->
      <!-- <input type="checkbox" v-model="month" /> -->
      <!-- (편법)input에 제한주면 될듯 -->
      <!-- input에 제약사항 걸고 싶으면 Vue전용 form validation 라이브러리 설치하셈 그럼 watcher 사용할 필요 없이 HTML조작으로 가능함 -->
      <!-- <input type="range" min="1" max="12" /> -->
      <!-- v-model="데이터이름" => 사용자가 입력한 값을 데이터이름에 넣어줌 -->
      <!-- 만약 문자를 입력받을거면 data에서 초기값을 문자로("") 하셈 -->
      <!-- <input v-model.number="month" /> -->
      <input v-model="month" />
      <!-- 사용자가 <input>에 입력한 것은 전부 문자자료형임 근데 js는 문자랑 숫자 곱셈 잘해줌 -->
      <!-- 그래도 number 타입으로 변환하고 싶으면 .number써주면 numer 타입으로 변환 됨 -->
      <!-- 만약 input에 문자를 입력하면 경고문을 띄우고 싶다 그럼 watcher 쓰셈(data 감시하는 함수) -->
      <p>
        {{ month }}개월 선택함:
        {{ (원룸들[누른거].price * month).toLocaleString("ko-KR") }} 원
      </p>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  // 2. 자식은 props로 받은거 등록 => props:{데이터이름:자료형이름}
  data() {
    return {
      month: 1,
    };
  },
  // 데이터감시하려면 watch:{감시할데이터티}
  watch: {
    // month라는 데이터가 변할 때마다 여기있는 코드 실행됨
    // month의 첫 번째 parameter에 변경된 값, 두 번째 parameter에 변경전 값이 들어옴
    month(after) {
      // 사용자가 month를 글자로 입력하면 경고문 띄워주셈
      // 사용자가 month에 입력한 데이터가 13보다 크면 경고문 띄우기
      if (after > 12) {
        alert("12이상 입력하지 마셈");
        this.month = 1;
      }
      // isNaN()안에 숫자를 입력하면 false, 글자를 입력하면 true가 나옴
      // 근데 <input>에 입력한 데이터는 뭘해도 문자이기 때문에 무조건 string 자료가 나옴
      // 그래서 isNan()이 더 유용해보이지만 v-model.number를 활용하면 또 다를 수 있겠죠~
      // /\s/g = s는 공백문자를 찾음(스페이스, 탭 등), g는 검색범위를 전역으로 확장
      // https://cityattack.tistory.com/64
      const str = /\s/g;
      if (isNaN(after) === true) {
        alert("숫자만 입력하셈");
        this.month = 1;
      } else if (typeof after === "string" && after.match(str)) {
        // typeof after === "string" 해줘야 다시 1로 값이 변환됨
        alert("숫자만 입력하셈");
        this.month = 1;
      }
    },
  },
  props: {
    // 받아온 데이터의 자료형 이름을 대문자로 => 틀려도 됨 에러뜨지 않음 디버깅용
    // (주의) props는 read-only임 받아온거 수정하면 큰일남
    // ex) 모달창열렸니 = false => 이렇게 수정하면 안됨
    원룸들: Array,
    누른거: Number,
    모달창열렸니: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit(`closeModal`);
    },
  },
  // input에 뭐 입력하면 재렌더링이 일어남 => lifecycle 용어로 update라고 함
  beforeUpdate() {
    // input값은 string이기 때문에 ===를 사용하려면 string타입으로 비교 해야함
    if (this.month === "2") {
      alert("2개월은 너무 적음.. 안팝니다");
      this.month = 3;
    }
  },
};
</script>

<style>
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
