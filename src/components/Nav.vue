<template>
  <nav class="position-fixed">
      <router-link
      class="text-center border-circle ds-inline-block"
      :class="{'nav-active':status === 'TaskList'}"
      to="/"
      @click.native="changePage('TaskList')"
      >
        <i class="fas fa-align-left"></i>
      </router-link>
      <router-link
      class="text-center border-circle ds-inline-block mt-50"
      to="/Analysis"
      :class="{'nav-active':status === 'Ringtones'}"
      @click.native="changePage('Ringtones')"
      >
        <i class="fas fa-chart-line"></i>
      </router-link>
      <router-link
      class="text-center border-circle ds-inline-block mt-50"
      :class="{'nav-active':status === 'Analysis'}"
      to="/Ringtones"
      @click.native="changePage('Analysis')"
      >
        <i class="far fa-bell"></i>
      </router-link>
      <h1>POMODORO</h1>
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      status: 'TaskList',
    };
  },
  methods: {
    changePage(input) {
      this.status = input;
    },
  },
};
</script>

<style>

</style>
