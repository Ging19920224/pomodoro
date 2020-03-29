<template>
  <div class="statistics">
    <div class="ds-flex pl-50">
      <div class="statistics__box ds-inline-block mr-50">
        <p class="statistics__title text-center">Today</p>
        <span class="ds-inline-block statistics__number text-center">
          {{ todayNum }}
        </span>
        <span class="statistics__tomato">/ tomato</span>
      </div>
      <div class="statistics__box ds-inline-block">
        <p class="statistics__title text-center">Week</p>
        <span class="ds-inline-block statistics__number text-center">
          {{ weekNum }}
        </span>
        <span class="statistics__tomato">/ tomato</span>
      </div>
    </div>
    <div class="mt-100 text-center">
      <span
      class="ds-inline-block date-font statistics__btn mr-20"
      @click="changeWeek(false)"
      >
        <i class="fas fa-angle-left"></i>
      </span>
      <span class="ds-inline-block statistics__date date-font">
        {{ weekDate[0].date }} - {{ weekDate[6].date }}
      </span>
      <span
      class="ds-inline-block date-font statistics__btn ml-20"
      @click="changeWeek(true)"
      >
        <i class="fas fa-angle-right"></i>
      </span>
    </div>
    <div class="mt-50 diagram text-center">
      <div class="diagram__container ds-inline-block position-relative">
        <span
        class="diagram__straight position-absolute"
        v-for="(item, index) in 8"
        :key="`straight-${index}`"
        :class="`straight-${index}`"
        ></span>
        <span
        class="diagram__horizontal position-absolute"
        v-for="(item, index) in 6"
        :key="`horizontal-${index}`"
        :class="`horizontal-${index}`"
        ></span>
        <span
        v-for="(item, index) in diagramNum"
        :key="`diagramNum-${index}`"
        :class="`horizontal-${index + 1}`"
        class="diagram__num position-absolute">
          {{ item }}
        </span>
        <span
        v-for="(item, index) in weekDate"
        :key="`diagramDate-${index}`"
        :class="`straight-${index + 1}`"
        class="diagram__date position-absolute">
          {{ item.diagramDate }}
        </span>
        <span
        v-for="(item, index) in weekDate"
        :key="`pillar-${index}`"
        :class="`straight-${index + 1}`"
        :style="{ height: weekCompletedNum[index] * 25 + 'px' }"
        class="diagram__pillar position-absolute"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      todayNum: 0,
      weekNum: 0,
      today: {},
      weekDate: [
        {
          date: '',
          diagramDate: '',
        },
        {
          date: '',
          diagramDate: '',
        },
        {
          date: '',
          diagramDate: '',
        },
        {
          date: '',
          diagramDate: '',
        },
        {
          date: '',
          diagramDate: '',
        },
        {
          date: '',
          diagramDate: '',
        },
        {
          date: '',
          diagramDate: '',
        },
      ],
      diagramNum: ['2', '4', '6', '8', '10 ⤴'],
    };
  },
  computed: {
    ...mapGetters(['date', 'data']),
    monthLastDay() {
      return this.getLastday(this.today.year, this.today.month);
    },
    nowTodayNum() {
      return this.data.completed.length;
    },
    sunTaskNum() {
      return this.computedDateTask(0);
    },
    monTaskNum() {
      return this.computedDateTask(1);
    },
    tueTaskNum() {
      return this.computedDateTask(2);
    },
    wedTaskNum() {
      return this.computedDateTask(3);
    },
    thuTaskNum() {
      return this.computedDateTask(4);
    },
    friTaskNum() {
      return this.computedDateTask(5);
    },
    satTaskNum() {
      return this.computedDateTask(6);
    },
    weekCompletedNum() {
      const sun = this.sunTaskNum;
      const mon = this.monTaskNum;
      const tue = this.tueTaskNum;
      const wed = this.wedTaskNum;
      const thu = this.thuTaskNum;
      const fri = this.friTaskNum;
      const sat = this.satTaskNum;
      const total = sun + mon + tue + wed + thu + fri + sat;
      const array = [
        sun,
        mon,
        tue,
        wed,
        thu,
        fri,
        sat,
        total,
      ];
      return array;
    },
  },
  watch: {
    nowTodayNum: {
      handler: 'todayNumRun',
      immediate: true,
    },
    weekCompletedNum: {
      handler: 'weekNumRun',
      immediate: true,
    },
  },
  created() {
    this.getDate();
    this.getToday();
    this.getWeekDate();
  },
  mounted() {
    this.getData();
    this.todayNumRun();
    this.weekNumRun();
  },
  methods: {
    getDate() {
      this.$store.dispatch('getDate');
    },
    getData() {
      this.$store.dispatch('getData', this.date.dateCode);
    },
    getToday() {
      this.today.year = this.date.year;
      this.today.month = this.date.month;
      this.today.date = this.date.date;
      this.today.week = this.date.week;
    },
    getLastday(year, month) {
      const day = new Date(year, month, 0);
      return day.getDate();
    },
    getWeekDate() {
      const {
        year,
        month,
        date,
        week,
      } = this.today;
      const firstDay = this.getWeekFirstDay(week, date);
      const sun = this.checkMonth(year, month, firstDay);
      const mon = this.checkMonth(year, month, firstDay + 1);
      const tue = this.checkMonth(year, month, firstDay + 2);
      const wed = this.checkMonth(year, month, firstDay + 3);
      const thu = this.checkMonth(year, month, firstDay + 4);
      const fri = this.checkMonth(year, month, firstDay + 5);
      const sat = this.checkMonth(year, month, firstDay + 6);
      this.weekDate[0].date = `${sun.year}.${sun.month}.${sun.date}`;
      this.weekDate[0].diagramDate = `${sun.month}/${sun.date}`;
      this.weekDate[1].date = `${mon.year}.${mon.month}.${mon.date}`;
      this.weekDate[1].diagramDate = `${mon.month}/${mon.date}`;
      this.weekDate[2].date = `${tue.year}.${tue.month}.${tue.date}`;
      this.weekDate[2].diagramDate = `${tue.month}/${tue.date}`;
      this.weekDate[3].date = `${wed.year}.${wed.month}.${wed.date}`;
      this.weekDate[3].diagramDate = `${wed.month}/${wed.date}`;
      this.weekDate[4].date = `${thu.year}.${thu.month}.${thu.date}`;
      this.weekDate[4].diagramDate = `${thu.month}/${thu.date}`;
      this.weekDate[5].date = `${fri.year}.${fri.month}.${fri.date}`;
      this.weekDate[5].diagramDate = `${fri.month}/${fri.date}`;
      this.weekDate[6].date = `${sat.year}.${sat.month}.${sat.date}`;
      this.weekDate[6].diagramDate = `${sat.month}/${sat.date}`;
    },
    getWeekFirstDay(week, date) {
      let firstDay = 0;
      firstDay = date - week;
      if (week === 0) firstDay = date;
      return firstDay;
    },
    checkMonth(inputYear, inputMonth, inputDay) {
      let lastDay = this.getLastday(inputYear, inputMonth);
      let outputDay = inputDay;
      let outputMonth = inputMonth;
      let outputYear = inputYear;
      switch (true) {
        case outputDay > lastDay:
          outputDay -= lastDay;
          outputMonth += 1;
          break;
        case outputDay <= 0:
          outputMonth -= 1;
          if (outputMonth <= 0) {
            outputMonth = 12;
            outputYear -= 1;
          }
          lastDay = this.getLastday(outputYear, outputMonth);
          outputDay = lastDay + outputDay;
          break;
        default:
      }
      if (outputMonth > 12) {
        outputMonth = 1;
        outputYear += 1;
      }
      const output = {
        year: outputYear,
        month: outputMonth,
        date: outputDay,
      };
      return output;
    },
    todayNumRun() {
      const todayTaskNum = this.nowTodayNum;
      setTimeout(() => {
        if (this.todayNum === todayTaskNum) return;
        this.todayNum += 1;
        this.todayNumCycle();
      }, 40);
    },
    todayNumCycle() {
      this.todayNumRun();
    },
    weekNumRun() {
      const weekTaskNum = this.weekCompletedNum[7];
      if (this.weekNum > weekTaskNum) this.weekNum = weekTaskNum;
      setTimeout(() => {
        if (this.weekNum === weekTaskNum) return;
        this.weekNum += 1;
        this.weekNumCycle();
      }, 40);
    },
    weekNumCycle() {
      this.weekNumRun();
    },
    changeWeek(status) {
      const inputYear = this.today.year;
      const inputMonth = this.today.month;
      let checkDay = this.today.date;
      if (status) {
        checkDay += 7;
      } else {
        checkDay -= 7;
      }
      const output = this.checkMonth(inputYear, inputMonth, checkDay);
      this.today.year = output.year;
      this.today.month = output.month;
      this.today.date = output.date;
      this.getWeekDate();
    },
    computedDateTask(index) {
      let count = 0;
      this.data.all.forEach((item) => {
        if (item.showDate === this.weekDate[index].date && item.isComplete) count += 1;
      });
      return count;
    },
  },
};
</script>
