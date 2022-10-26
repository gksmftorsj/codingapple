const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 만든 Vue 사이트 build & Github Pages로 배포하려면
  // 1. npm run build
  // 2. Repository name 은 꼭 왼쪽에 뜨는 아이디.github.io 라고 입력해야 호스팅받을 수 있음
  // 3. dist 폴더 드래그 앤 드롭 X => dist 폴더 안의 내용물 드래그 앤 드롭 O
  // 혹은 "내아이디.github.io/서브경로" 에다가 발행하고 싶은 경우 => dist파일만 업로드 후 vue.config.js파일에서 아래코드처럼 작성
  // publicPath: "/서브경로(repository이름)",
});
