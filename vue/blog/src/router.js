// router 사용법 => npm install vue-router@4 설치 후 router 폴더 생성 후 아래코드 작성
import { createWebHistory, createRouter } from "vue-router";
import List from "./components/List.vue";
import Home from "./components/Home.vue";
import Detail from "./components/Detail.vue";
import Error from "./components/Error.vue";
import Author from "./components/Author.vue";
import Comment from "./components/Comment.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/list",
    component: List,
  },
  {
    // /detail/X로 접속하면 X번 게시물 보여주기
    // /detail/:작명
    // /detail/:작명/:작명 => 여러 개 사용 가능
    // 파라미터 업그레이드 가능
    // 1. 소괄호 안에 정규식 입력가능 => /detail/:id(\\d+) => 숫자만 찾아주는 정규식 문법
    // 2. *입력하면 :id 반복
    // 필요하면 vue-router4 참고 https://router.vuejs.org/
    path: "/detail/:id",
    component: Detail,
    // nested routes 만드는 법
    // /는 홈페이지라는 뜻이기 때문에 경로는 상대경로로 적어주셈
    children: [
      {
        path: "author",
        component: Author,
      },
      {
        path: "comment",
        component: Comment,
      },
    ],
  },
  {
    // .* => 모든문자라는 정규식 문법
    path: "/:anything(.*)",
    component: Error,
  },
  // {
  //   path: "/경로",
  //   component: import해온 컴포넌트,
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
