<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
    <Time></Time>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
import Time from './components/Time.vue';

export default {
  components: {
    Nav,
    Time,
  },
};
</script>

<style lang="scss">
  @import 'assets/scss/index.scss';
  #app {
    margin-top: -10px;
  }
</style>
