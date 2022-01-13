<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "./views/login.vue";
import Index from "./views/index.vue";

export default {
  components: { Login, Index }
}
</script>

<style>
@import "../src/assets/css/reset.css";
</style>
