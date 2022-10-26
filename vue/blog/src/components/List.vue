<template>
  <!-- v-for data나 props의 값과 첫 번째 파라미터의 이름이 같을 때 첫 번째 파라미터의 값이 데이터바인딩값으로 들어감 -->
  <div v-for="(블로그글, i) in 블로그글" :key="i">
    <!-- $router => 페이지 이동관련 기능이 모아져 있는 변수임 / .push()는 페이지 이동시켜주는 함수임 / .go(n) => n번 앞으로, -n번 뒤로 n번 페이지를 이동시켜주는 함수임  -->
    <!-- $route는 현재경로와 관련된 것을 알려주는 변수임 => $route.fullPath => 현재 전체경로를 알려줌 -->
    <h5 @click="$router.push(`/detail/${i}`)">{{ 블로그글.title }}</h5>
    <p>{{ 블로그글.date }}</p>
  </div>
</template>
<script>
export default {
  name: "lsit",
  props: {
    블로그글: Array,
  },
};
</script>
<style></style>
