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
      :class="`rotate-${index}`"
      v-show="completed >= index * 0.0667 && timer.mode === 'WORK'"
      class="workProgress-bar position-absolute"></div>
      <div v-for="(item, index) in 1500"
      :key="`break-${index}`"
      :class="`rotate-${index}`"
      v-show="completed >= index * 0.0667 && timer.mode === 'BREAK'"
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
    <audio id="audio-0" src="../assets/ring/default.mp3"></audio>
    <audio id="audio-1" src="../assets/ring/bell.mp3"></audio>
    <audio id="audio-2" src="../assets/ring/birds.mp3"></audio>
    <audio id="audio-3" src="../assets/ring/classic.mp3"></audio>
    <audio id="audio-4" src="../assets/ring/opening.mp3"></audio>
    <audio id="audio-5" src="../assets/ring/whatFlash.mp3"></audio>
    <audio id="audio-6" src="../assets/ring/alert.mp3"></audio>
    <audio id="audio-7" src="../assets/ring/warning.mp3"></audio>
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
      clock: {
        seconds: '',
        minutes: '',
        hour: '',
      },
      timer: {
        status: 'Start',
        mode: 'WORK',
        isPush: false,
        minutes: 1,
        work: 0,
        break: 0,
        secondTotal: 60,
        seconds: 60,
        cumulativeSecond: -1,
      },
    };
  },
  computed: {
    ...mapGetters(['data', 'date', 'nowTask', 'isDoing', 'selectedRing', 'time']),
    nowWorkSetTime() {
      return this.time.work;
    },
    nowBreakSetTime() {
      return this.time.break;
    },
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
  watch: {
    nowWorkSetTime: {
      handler: 'getTime',
      immediate: true,
    },
    nowBreakSetTime: {
      handler: 'getTime',
      immediate: true,
    },
  },
  mounted() {
    this.getRing();
    this.getTime();
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
    taskActive() {
      const status = !this.isDoing;
      if (this.timer.mode === 'WORK') this.$store.dispatch('taskActive', status);
    },
    getData() {
      this.$store.dispatch('getData', this.date.dateCode);
    },
    messageDisplay(message, display) {
      this.$store.dispatch('messageDisplay', { message, display });
    },
    completedTask() {
      const target = this.nowTask;
      const data = JSON.parse(JSON.stringify(this.data));
      data.all.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        if (item.id === target) item.isComplete = true;
      });
      localStorage.setItem('task', JSON.stringify(data.all));
      this.getData();
      this.$store.dispatch('choseTask', '');
    },
    getTime() {
      this.$store.dispatch('getTime');
      this.timer.work = this.time.work;
      this.timer.break = this.time.break;
      this.timer.secondTotal = this.time.work * 60;
      if (this.timer.mode === 'WORK') {
        this.timer.minutes = this.time.work;
      } else {
        this.timer.minutes = this.time.break;
      }
    },
    getNowTime(second, minutes, hour) {
      const vm = this.clock;
      vm.seconds = second;
      vm.minutes = minutes;
      vm.hour = hour;
    },
    timerActive() {
      if (this.nowTask === '' && this.timer.mode === 'WORK') {
        this.messageDisplay('您尚未選取或新增工作任務', true);
        return;
      }
      const vm = this.timer;
      if (!vm.isPush) {
        this.taskActive();
        vm.isPush = true;
        vm.status = 'Pause';
        this.timerStart();
      } else {
        this.taskActive();
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
        }, 1000);
      }
    },
    timerCycle() {
      this.timeGo();
    },
    checkMode() {
      const vm = this.timer;
      if (vm.minutes < 0 && vm.mode === 'WORK') {
        vm.isPush = false;
        this.taskActive();
        vm.status = 'Start';
        vm.mode = 'BREAK';
        vm.minutes = vm.break;
        vm.cumulativeSecond = -1;
        vm.secondTotal = vm.break * 60;
        this.completedTask();
        const message = '恭喜完成一項工作囉，休息一下吧！';
        this.messageDisplay(message, true);
        this.play(this.selectedRing.id);
      } else if (vm.minutes < 0 && vm.mode === 'BREAK') {
        vm.isPush = false;
        vm.status = 'Start';
        vm.mode = 'WORK';
        vm.minutes = vm.work;
        vm.cumulativeSecond = -1;
        vm.secondTotal = vm.work * 60;
        this.$store.dispatch('choseTask', '');
        const message = '休息時間結束囉，準備開始下一個工作吧！';
        this.messageDisplay(message, true);
        this.play(this.selectedRing.id);
      }
    },
    getRing() {
      this.$store.dispatch('getRing');
    },
    play(id) {
      const audioID = id;
      const audio = document.querySelector(`#${audioID}`);
      if (!this.isPlaying) {
        audio.play();
        this.isPlaying = true;
      }
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime > 4) {
          this.isPlaying = false;
          audio.pause();
          audio.currentTime = 0;
        }
      });
      audio.addEventListener('ended', () => {
        this.isPlaying = false;
        audio.pause();
        audio.currentTime = 0;
      });
    },
  },
};
</script>

<style>

</style>
