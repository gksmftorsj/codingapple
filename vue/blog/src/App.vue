<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Vuelog</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/list">List</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- <router-link></router-link> => 다른 페이지 이동링크 만들 때 쓰셈(새로고침 없는 a태그임) -->
  <!-- <router-link to="/??">??페이지</router-link> -->

  <!-- 라우터 보여줄 곳을 <router-view>로 표시 -->
  <div class="mt-4 text-center">
    <router-view :블로그글="블로그글"></router-view>
  </div>

  <!-- v-for 첫번째 파라미터의 이름과 props 보내는 값(data)의 이름이 같으면 첫 번째 파라미터의 값이 들어가짐 그러니까 v-for로 props 보낼 때는 다른 이름을 사용하자 -->
  <!-- 아니면 props를 보낼 때 i값을 붙이지말고 그냥 첫번째 파라미터의 값을 그대로 넣으면 어차피 i값 붙인거나 같으니까 같은 이름 사용하려면 i값 붙이지 말고 사용하자 -->
  <!-- <List v-for="(블로그글, i) in 블로그글" :key="i" :블로그글="블로그글" /> -->
</template>

<script>
// import List from "./components/List.vue";
import blog from "./assets/blog.js";

export default {
  name: "App",
  data() {
    return {
      블로그글: blog,
    };
  },
  components: {
    // List,
  },
};
</script>

<style></style>
