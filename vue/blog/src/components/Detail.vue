<template>
  <!-- $route 사용하면 route와 관련된 모든 정보들을 가져다 쓸 수 있음 -->
  <!-- ($route.params.router에서 작명한것) 하면 파라미터자리에 기입된거 전부 가져옴 -->
  <div>
    <h4>상세페이지</h4>
    <h5>{{ 블로그글[$route.params.id].title }}</h5>
    <p>{{ 블로그글[$route.params.id].content }}</p>
  </div>
  <router-view></router-view>
</template>
<script>
export default {
  name: "detail",
  props: {
    블로그글: Array,
  },
};
</script>
<style></style>
