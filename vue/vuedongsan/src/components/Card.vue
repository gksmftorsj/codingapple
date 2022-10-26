<template>
  <!-- 밑에 있는 데이터를 HTML에 꽂아넣고 싶으면 {{데이터이름}} -->
  <!-- Vue는 신기해서 data를 변경하면 data와 관련된 HTML에도 실시간으로 반영됨 -->
  <!-- {{데이터바인딩}}을 사용해서 실시간 자동 렌더링을 쓰자 -->
  <!-- 스무스하게 web-app처럼 부드럽게 변경됨 -->
  <!-- 그러니까 자주 변할거같은 데이터들은 밑에 보관하고 HTML에 {{꽂아넣자}} -->
  <!-- 데이터값과 {{데이터바인딩}}값이 같을 때 => 역삼동원룸[i]가 되어서 => "역"값만 나옴 -->
  <!-- 그러므로 제대로 쓰려면 v-for에서 작명할 때 {{데이터바인딩}}값과 다르게 써야함 -->
  <div>
    <!-- src에 있는거 가져올 때 경로는 ./부터 -->
    <!-- v-bind 약자가 :src임 -->
    <!-- v-bind인 :src를 사용하면 js에서 만든 함수사용 가능함 -->
    <img :src="원룸.image" class="room-img" />
    <!-- 카드 안의 제목을 눌러야 모달창 뜨게? -->
    <!-- custom event => 이걸로 부모데이터 수정해야됨(실은 데이터 수정해달라는 메세지임) -->
    <!-- 메세지 보내는 법 => $emit(`작명`, 데이터) -->
    <!-- 제목 누르면 원룸.id라는 데이터를 담아서 부모한테 메세지 발사해주세요~ -->
    <!-- $어쩌구는 Vue만의 특별한 변수 -->
    <!-- custom event가 길 때 그냥 함수로 만들어서 써도 됨 -->
    <h4 @click="openMdoal">{{ 원룸.title }}</h4>
    <p>{{ 원룸.price.toLocaleString("ko-KR") }}원</p>
    <!-- 전통방식은 onclick="" -->
    <!-- Vue방식은 v-on:click="자바스크립트~~" or @click="자바스크립트~~" -->
    <!-- v-on의 약자가 @임-->
    <!-- 쌩js 스타일 -->
    <!-- 1. 버튼누르면 숫자 찾아서 +1 -->
    <!-- 2. 그리고 +1된걸 HTML에 반영해주셈 -->
    <!-- Vue 스타일 -->
    <!-- 1. 버튼 누르면 관련된 데이터만 +1(Vue는 데이터 변하면 HTML에 실시간으로 바로 반영됨) -->
    <button @click="increase">허위매물신고</button>
    <span>신고수: {{ 신고수 }}</span>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {};
  },
  props: {
    원룸: Object,
    신고수: Number,
  },
  methods: {
    openMdoal() {
      this.$emit(`openModal`, this.원룸.id);
    },
    increase() {
      this.$emit(`increase`);
    },
  },
};
</script>

<style>
.room-img {
  width: 100%;
  margin-top: 40px;
}
</style>
