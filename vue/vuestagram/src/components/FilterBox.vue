<template>
  <!-- :class="필터명 + ' filter-item'" 이렇게 작성해도 됨 -->
  <!-- 사진 위에 필터명을 표기해주자 근데 props 말고.. slot을 쓰자 -->
  <!-- slot으로 부모 -> 자식 데이터전송법 -->
  <!-- 1. 자식은 구멍뚫기 -->
  <!-- 근데 slot은 태그 안에 데이터바인딩할 때만 사용가능하므로 별로... 근데 내용물 데이터바인딩 때는 유용함 -->
  <div
    class="filter-item"
    :class="필터명"
    :style="{ backgroundImage: `url(${imgUrl})` }"
    @click="fire"
  >
    <slot></slot>
    <!-- slot 여러 개 사용하는 법 -->
    <!-- <slot name="a"></slot>
    <slot name="b"></slot> -->
    <!-- slot props => slot 사용할 때 부모가 자식데이터 필요한 경우 -->
    <!-- 1. <slot :자식데이터="자식데이터"></slot> -->
    <!-- <slot :msg="msg"></slot> -->
  </div>
</template>
<script>
export default {
  name: "filterbox",
  data() {
    return {
      msg: "hello",
    };
  },
  props: {
    imgUrl: String,
    필터명: String,
  },
  methods: {
    fire() {
      // 멀리있는 컴포넌트간에 데이터 전송할 땐 mitt사용
      // mitt로 데이터전송하는 법
      // this.emitter.emit("작명", "데이터")으로 발사하고 수신하면 됨
      this.emitter.emit("선택한필터명", this.필터명);
      console.log(this.필터명);
    },
  },
};
</script>
<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
