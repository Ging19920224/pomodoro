<template>
  <div class="time position-fixed text-center">
    <h2 class="text-center" :class="{'text-break':timer.mode === 'BREAK'}">
      <i class="far fa-clock"></i>
      {{ clockStatus }}
      {{ nowHour }}
      <span :class="{'second-active':clock.seconds % 2 === 0}">:</span>
      {{ nowMinutes }}
    </h2>
    <div class="time__clock border-circle position-relative"
    :class="{'border-break':timer.mode === 'BREAK'}">
      <div class="time__view border-circle position-absolute"
      :class="{'border-break':timer.mode === 'BREAK'}">
        <span class="position-absolute time__font">
          {{ nowTimerMinutes }}:{{ nowTimerSeconds }}
        </span>
        <span
        class="position-absolute mode"
        :class="{'text-break':timer.mode === 'BREAK'}"
        >
          {{ timer.mode }}
        </span>
      </div>
      <div class="progress position-absolute border-circle"></div>
      <div v-for="(item, index) in 1500"
      :key="`work-${index}`"
      :class="`workRotate-${index}`"
      v-show="timer.cumulativeSecond >= index && timer.mode === 'WORK'"
      class="workProgress-bar position-absolute"></div>
      <div v-for="(item, index) in 300"
      :key="`break-${index}`"
      :class="`breakRotate-${index}`"
      v-show="timer.cumulativeSecond >= index && timer.mode === 'BREAK'"
      class="breakProgress-bar position-absolute bg-break"></div>
    </div>
    <div class="mt-30">
      <button class="time__btn"
      :class="{'bg-break':timer.mode === 'BREAK'}"
      @click="timerActive">
        {{ timer.status }}
      </button>
    </div>
    <div class="time__pointGroup mt-30">
      <span
      class="time__point border-circle mr-25"
      :class="{
        'bg-work':completed >= 25 && timer.mode === 'WORK',
        'bg-break':completed >= 25 && timer.mode === 'BREAK',
        'border-break': timer.mode === 'BREAK'
        }"
      ></span>
      <span
      class="time__point border-circle mr-25"
      :class="{
        'bg-work':completed >= 50 && timer.mode === 'WORK',
        'bg-break':completed >= 50 && timer.mode === 'BREAK',
        'border-break': timer.mode === 'BREAK'
        }"
      ></span>
      <span
      class="time__point border-circle mr-25"
      :class="{
        'bg-work':completed >= 75 && timer.mode === 'WORK',
        'bg-break':completed >= 75 && timer.mode === 'BREAK',
        'border-break': timer.mode === 'BREAK'
        }"
      ></span>
      <span
      class="time__point border-circle"
      :class="{
        'bg-work':completed >= 100 && timer.mode === 'WORK',
        'bg-break':completed >= 100 && timer.mode === 'BREAK',
        'border-break': timer.mode === 'BREAK'
        }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Time',
  data() {
    return {
      clock: {
        seconds: '',
        minutes: '',
        hour: '',
      },
      timer: {
        status: 'Start',
        mode: 'WORK',
        isPush: false,
        minutes: 25,
        secondTotal: 1500,
        seconds: 60,
        cumulativeSecond: -1,
      },
    };
  },
  computed: {
    nowHour() {
      let { hour } = this.clock;
      if (hour < 10) hour = `0${hour}`;
      return hour;
    },
    nowMinutes() {
      let { minutes } = this.clock;
      if (minutes < 10) minutes = `0${minutes}`;
      return minutes;
    },
    clockStatus() {
      const { hour } = this.clock;
      let status = '';
      if (hour < 12) {
        status = 'AM';
      } else {
        status = 'PM';
      }
      return status;
    },
    nowTimerSeconds() {
      const { seconds } = this.timer;
      let nowSeconds = seconds;
      if (seconds < 10) nowSeconds = `0${seconds}`;
      if (seconds === 60) nowSeconds = '00';
      return nowSeconds;
    },
    nowTimerMinutes() {
      const { minutes } = this.timer;
      if (minutes < 0 || minutes === 60) return '00';
      let nowMinutes = minutes;
      if (minutes < 10) nowMinutes = `0${minutes}`;
      return nowMinutes;
    },
    completed() {
      const vm = this.timer;
      return (vm.cumulativeSecond / vm.secondTotal) * 100;
    },
  },
  mounted() {
    const getTime = new Date();
    let hour = getTime.getHours();
    let minutes = getTime.getMinutes();
    let second = getTime.getSeconds();
    this.getNowTime(second, minutes, hour);
    window.setInterval(() => {
      second += 1;
      if (second >= 60) {
        second = 0;
        minutes += 1;
      }
      if (minutes >= 60) {
        minutes = 0;
        hour += 1;
      }
      if (hour >= 24) hour = 0;
      this.getNowTime(second, minutes, hour);
    }, 1000);
  },
  methods: {
    getNowTime(second, minutes, hour) {
      const vm = this.clock;
      vm.seconds = second;
      vm.minutes = minutes;
      vm.hour = hour;
    },
    timerActive() {
      const vm = this.timer;
      if (!vm.isPush) {
        vm.isPush = true;
        vm.status = 'Pause';
        this.timerStart();
      } else {
        vm.isPush = false;
        vm.status = 'Start';
        this.timerStart();
      }
    },
    timerStart() {
      this.timeGo();
    },
    timeGo() {
      const vm = this.timer;
      if (vm.isPush) {
        setTimeout(() => {
          if (vm.cumulativeSecond === -1) vm.cumulativeSecond = 0;
          if (vm.seconds === 0 || vm.cumulativeSecond === 0) {
            vm.seconds = 60;
            vm.minutes -= 1;
          }
          if (vm.minutes === -1) {
            this.checkMode();
            return;
          }
          vm.seconds -= 1;
          vm.cumulativeSecond += 1;
          this.timerCycle();
        }, 500);
      } else {
        clearTimeout();
      }
    },
    timerCycle() {
      setTimeout(() => {
        this.timeGo();
      }, 500);
    },
    checkMode() {
      const vm = this.timer;
      if (vm.minutes < 0 && vm.mode === 'WORK') {
        vm.isPush = false;
        vm.status = 'Start';
        vm.mode = 'BREAK';
        vm.minutes = 5;
        vm.cumulativeSecond = -1;
        vm.secondTotal = 300;
      } else if (vm.minutes < 0 && vm.mode === 'BREAK') {
        vm.isPush = false;
        vm.status = 'Start';
        vm.mode = 'WORK';
        vm.minutes = 25;
        vm.cumulativeSecond = -1;
        vm.secondTotal = 1500;
      }
    },
  },
};
</script>

<style>

</style>
