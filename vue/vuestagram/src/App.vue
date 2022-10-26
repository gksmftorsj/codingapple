<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step = 2">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- store.js에 있는 state 꺼내쓰는 방법 => $store.state.데이터이름 -->
  <h4>안녕{{ name }} {{ age }}</h4>
  <!-- props 쓸 때는 event custom을 사용했어야 했는데 Vuex를 사용하면 데이터변경도 쉽게 할 수 있음-->
  <!-- 근데 Vuex 국룰은 컴포넌트 안에서 직접 수정하기 금지임 => 컴포넌트 100만개 있으면 버그났을 때 찾기 힘듦 -->
  <!-- 그래서 수정하고 싶으면 미리 store.js에 수정방법을 정의해두고 그 방법을 컴포넌트에서 소환해서 수정해야함 -->
  <!-- <button @click="$store.state.name = 'park'">버튼</button> -->
  <!-- 버튼을 누르면 state를 "park"으로 바꿔보자 -->
  <!-- 1. store.js에 state 수정방법 정의 -->
  <!-- 2. 수정하고 싶으면 store.js에 부탁 => $store.commit(함수명) => 올바른 Vuex 사용법 -->
  <button @click="$store.commit('이름변경')">이름변경버튼</button>
  <!-- 버튼누를 때 원하는 만큼 ++해주고 싶으면? commit(함수명, store.js에게 전달하는 데이터)-->
  <button @click="나이증가(10)">나이증가버튼</button>

  <p>{{ $store.state.more }}</p>

  <!-- commit은 mutations함수를 실행해달라고 부탁하는 것이고 dispatch는 actions함수를 실행해달라고 부탁하는 것임 -->
  <button @click="$store.dispatch('getData')">더보기버튼</button>

  <!-- 데이터 수신은 보낸 컴포너트에서 해야함 -->
  <Container
    :게시물="게시물"
    :step="step"
    :imgUrl="imgUrl"
    :선택한필터명="선택한필터명"
    @write="작성한글 = $event"
  />

  <!-- 더보기 버튼 누르면 1. 서버에서 추가 게시물 가져옴 2. 그걸 <Post>로 보여줄 것 -->
  <button v-if="step === 0" @click="more">더보기</button>

  <!-- methods 안에 만든 함수이기 때문에 버튼 누를때 마다 재렌더링됨 -->
  <!-- <p>{{ now1() }}{{ 카운터 }}</p> -->
  <!-- computed 함수는 ()쓰지말고 이름만 쓰셈 -->
  <p>{{ now2 }}{{ 카운터 }}</p>
  <button @click="카운터++">버튼</button>

  <!-- 이미지 업로드한걸 HTML에 보여주려면? -->
  <!-- FileReader() or URL.createObjectURL() 사용하기 -->
  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- 탭 만드는법 -->
  <!-- <div v-if="step === 0">내용0</div>
  <div v-if="step === 1">내용1</div>
  <div v-if="step === 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button>
  <div style="margin-top: 500px"></div> -->
</template>

<script>
import Container from "./components/Container.vue";
import postdata from "./assets/postdata.js";
// axios import 하는법
import axios from "axios";
// vuex 함수인 mapstate 가져와야 함 {}안에 작성안하면 에러남
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      step: 0,
      게시물: postdata,
      더보기: 0,
      imgUrl: "",
      작성한글: "",
      선택한필터명: "",
      카운터: 0,
    };
  },
  mounted() {
    // mitt 수신하는 코드는 mounted안에 작성하는게 관습적임
    // this.emitter.on("작명", ()=>{})으로 수신하면 됨 => 작명이라는 이벤트를 발사하면 콜백함수 안의 코드를 실행해주셈
    this.emitter.on("선택한필터명", (data) => {
      // parameter에는 이벤트발사할 때 들어있던 데이터가 있음
      console.log(data);
      this.선택한필터명 = data;
    });
  },
  components: {
    Container,
  },
  // 함수만들 때 computer or methods 사용
  // computed 함수는 처음 실행 후 다시 사용해도 실행되지 않습니다. 그래서 처음 실행하고 값을 간직함 => 연산결과저장용 함수들임
  // 연산결과를 computed에 저장해놓으면 다시 사용하기 편함
  // computed 함수는 꼭 return이 있어야함
  computed: {
    now2() {
      return new Date();
    },
    // name() {
    //   return this.$store.state.name;
    // },
    // age() {
    //   return this.$store.state.age;
    // },
    // vuex state 한 번에 꺼내쓰려면 ...mapState 사용
    // 다른 computed 함수랑 함께 쓰려면 ...필요
    // mapState, mapMutations, mapActions 모두 있음 => 코드가 더러워지면 써보자
    ...mapState(["name", "age", "likes"]),
    // name이라는 이름의 데이터를 가져다 쓰는데 다른 이름으로 가져다 쓰고 싶을 때 object형식으로 작성하면 됨
    // so 원래 {{name}}으로 데이터바인딩 해야 하는데 {{작명}}으로 데이터바인딩 가능함
    ...mapState({ 작명: "name" }),
  },
  // methods 함수는 사용할 때마다 실행됨
  methods: {
    ...mapMutations(["setMore", "좋아요증가", "나이증가"]),
    now1() {
      return new Date();
    },
    more() {
      // get 요청 성공했을 때 코드 실행하고 싶으면 .then 사용 / 실패했을 때 코드 실행하고 싶으면 .catch 사용
      axios
        .get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
        .then((result) => {
          console.log(result.data);
          this.게시물.push(result.data);
          this.더보기++;
        })
        .catch((err) => {
          console.log(err);
        });
      // post 요청은 axios.post()
      // axios.post("url", {name: "kim"}).then((result)=>{}).catch((err)=>{})
    },
    upload(e) {
      // 파일업로드시 코드실행
      const file = e.target.files;
      console.log(file[0]);
      // console.log(file[0].type); => 확장자 검사를 통해 파일 업로드 제한하기
      // 업로드 후엔 다음 페이지로 보내야함
      this.step = 1;
      // + 업로드한 이미지 띄우기
      // (방법1) FileReader() => 파일을 글자로 변환해줌
      // (방법2) URL.createObjectURL() => 이미지의 가상 URL을 생성해줌 => backgroud-imgae 속성으로 집어넣으면 끝
      this.imgUrl = URL.createObjectURL(file[0]);
      console.log(this.imgUrl);
      // binary 데이터를 다룰 때 BLOB이라는 object에 담아서 다룸
    },
    publish() {
      // 발행버튼 누르면?
      // this.게시물에 {내가쓴거} 밀어넣기
      const 내게시물 = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imgUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글,
        filter: this.선택한필터명,
      };
      // unshift => 앞에, push => 뒤에
      this.게시물.unshift(내게시물);
      this.step = 0;
    },
  },
};
</script>

<style>
/* css파일 따로 만든 뒤 import 해도 됨 */
/* @import "style.css"; */

body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
