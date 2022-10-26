<template>
  <!-- Vue3 버전부턴 v-if와 v-for 한 곳에 못씀 -->
  <div v-if="step === 0">
    <Post v-for="(게시물, i) in 게시물" :key="i" :게시물="게시물" :글순서="i" />
  </div>

  <!-- 필터선택페이지 -->
  <div v-if="step === 1">
    <div
      class="upload-image"
      :class="선택한필터명"
      :style="{ backgroundImage: `url(${imgUrl})` }"
    ></div>
    <div class="filters">
      <!-- cssgram.css파일 첨부하면 인스타그램 필터기능 완성 -->
      <FilterBox
        v-for="(필터명, i) in 필터명"
        :key="i"
        :필터명="필터명"
        :imgUrl="imgUrl"
      >
        <!-- 2. 부모 <컴포넌트>태그사이에 데이터넣기 -->
        <span>{{ 필터명 }}</span>
        <!-- slot 여러 개 사용하는 법 -->
        <!-- + HTML태그도 전송가능 -->
        <!-- <template v-slot:a><span>데이터1</span></template>
        <template v-slot:b><span>데이터2</span></template> -->
        <!-- 2. 부모는 <template v-slot:default="작명">{{작명.자식데이터}}</template> -->
      </FilterBox>
    </div>
  </div>

  <!-- 글작성페이지 -->
  <div v-if="step === 2">
    <div
      class="upload-image"
      :class="선택한필터명"
      :style="{ backgroundImage: `url(${imgUrl})` }"
    ></div>
    <div class="write">
      <!-- custom event 할 때 "" 사용하면 에러남 `` 사용해야함 -->
      <textarea @input="$emit('write', $event.target.value)" class="write-box">
      write!
      </textarea>
    </div>
  </div>
</template>
<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
export default {
  name: "Container",
  data() {
    return {
      필터명: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
      글순서: 0,
    };
  },
  props: {
    게시물: Array,
    step: Number,
    imgUrl: String,
    선택한필터명: String,
  },
  components: {
    Post,
    FilterBox,
  },
};
</script>
<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
