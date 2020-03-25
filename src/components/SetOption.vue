<template>
  <div class="container text-center">
    <div class="set__box ds-inline-block mt-50">
      <span class="ds-inline-block mr-20">Work Time : </span>
      <input
      type="text"
      v-model="setTime.work"
      class="ds-inline-block set__input text-center mr-20">
      <span class="ds-inline-block mr-20">Minutes</span>
      <button
      class="btn set__btn mr-5"
      @click="editTime('work')">
        save
      </button>
      <i class="fas fa-spinner fa-spin" v-if="isSave === 'work'"/>
    </div>
    <div class="set__box ds-inline-block mt-20">
      <span class="ds-inline-block mr-20">Break Time : </span>
      <input
      type="text"
      v-model="setTime.break"
      class="ds-inline-block set__input text-center mr-20">
      <span class="ds-inline-block mr-20">Minutes</span>
      <button
      class="btn set__btn mr-5"
      @click="editTime('break')"
      >
        save
      </button>
      <i class="fas fa-spinner fa-spin" v-if="isSave === 'break'"/>
    </div>
    <Message></Message>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from './Message.vue';

export default {
  components: {
    Message,
  },
  data() {
    return {
      setTime: {
        work: 0,
        break: 0,
      },
      isSave: '',
    };
  },
  computed: {
    ...mapGetters(['nowTask', 'isDoing', 'time']),
  },
  mounted() {
    this.getTime();
    this.setTime.work = this.time.work;
    this.setTime.break = this.time.break;
  },
  methods: {
    getTime() {
      this.$store.dispatch('getTime');
    },
    messageDisplay(message, display) {
      this.$store.dispatch('messageDisplay', { message, display });
    },
    editTime(type) {
      let message = '';
      if (this.nowTask !== '') {
        message = '請完成或取消任務後在進行修改';
        this.messageDisplay(message, true);
        return;
      }
      if (this.setTime.work <= 0 || this.setTime.work > 99 || this.setTime.work === '') {
        message = 'Work Time 不得等於 0 或大於 99';
        this.messageDisplay(message, true);
        return;
      }
      if (this.setTime.break <= 0 || this.setTime.break > 99 || this.setTime.break === '') {
        message = 'Break Time 不得等於 0 或大於 99';
        this.messageDisplay(message, true);
        return;
      }
      this.isSave = type;
      setTimeout(() => {
        const time = {
          work: this.setTime.work,
          break: this.setTime.break,
        };
        localStorage.setItem('time', JSON.stringify(time));
        this.getTime();
        this.isSave = '';
        message = '修改成功';
        this.messageDisplay(message, true);
      }, 500);
    },
  },
};
</script>

<style>

</style>
