<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import "@/Myjs/acfun.js"; //全局逻辑

export default {
  name: "App"
};
</script>

<style lang='scss'>
@import "/src/css/global";
</style>





