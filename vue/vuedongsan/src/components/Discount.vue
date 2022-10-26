<template>
  <!-- 컴포넌트를 만들고 싶으면 vue파일 만드셈 <template>에 축약할 HTML 넣기 -->
  <div class="discount">
    <h4>지금 결제하면 {{ discount }}% 할인</h4>
  </div>
</template>

<script>
export default {
  // 심심하면 name넣기
  name: "Discount",
  data() {
    return {};
  },
  props: {
    discount: Number,
  },
};
</script>

<style>
.discount {
  background: #eee;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>
