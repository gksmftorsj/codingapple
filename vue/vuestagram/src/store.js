// Vuex 4 셋팅 => 모든 컴포넌트가 쓸 수 있는 데이터 저장용 js파일을 만들어야함 => store.js로 만드는게 보통 관습적인 작명법임
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      // state에 보관하고 싶으면 여기에 하셈
      name: "kim",
      age: 20,
      likes: [36, 31, 65],
      좋아요눌렀니: [false, false, false],
      more: {},
    };
  },
  // state 수정방법 정의하는 곳임 parameter state는 state object 값임
  mutations: {
    // state 변경은 무조건 mutations가 함
    setMore(state, data) {
      state.more = data;
    },
    이름변경(state) {
      state.name = "park";
    },
    나이증가(state, payload) {
      state.age++;
      console.log(payload);
    },
    좋아요증가(state, i) {
      if (state.좋아요눌렀니[i] === false) {
        state.likes[i]++;
        state.좋아요눌렀니[i] = true;
      } else {
        state.likes[i]--;
        state.좋아요눌렀니[i] = false;
      }
    },
  },
  // ajax하는 곳입니다 또는 오래걸리는 작업들을 처리하는 곳입니다
  // mutations 안에다가 ajax요청해도 되지 않을까요? => 안됩니다
  // 순차적으로 state를 변경하고 싶으면 ex) 1. name바꾸고 -> 2.age바꾸고 => 근데 만약 name바꾸는 코드가 3초걸리면? 순서대로 쓴다고 순차적 실행을 보장할 수 없고 예상하면서 코드를 작성해야 하기 때문에 복잡해짐 그래서 시간이 걸리는 요청들은 actions에서 하도록 하자
  actions: {
    getData(context) {
      axios
        .get(`https://codingapple1.github.io/vue/more0.json`)
        .then((result) => {
          console.log(result.data);
          // actions parameter에 추가한 context는 대충 $store를 뜻함
          context.commit("setMore", result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default store;
