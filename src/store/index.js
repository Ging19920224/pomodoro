import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    nowTask: '',
    isDoing: false,
    time: {
      work: 25,
      break: 5,
    },
    date: {},
    data: {
      all: [],
      todayAll: [],
      undone: [],
      less: [],
      completed: [],
    },
    message: {
      display: false,
      message: '',
    },
    selectedRing: {
      name: 'default',
      id: 'audio-0',
    },
  },
  mutations: {
    NOWTASK(state, payload) {
      state.nowTask = payload;
    },
    SETMINUTES(state, payload) {
      state.setMinutes = payload;
    },
    DATE(state, payload) {
      state.date = payload;
    },
    DATA(state, payload) {
      state.data = payload;
    },
    ISDOING(state, payload) {
      state.isDoing = payload;
    },
    MESSAGE(state, payload) {
      state.message.message = payload.message;
      state.message.display = payload.display;
    },
    SELECTEDRING(state, payload) {
      state.selectedRing = payload;
    },
    TIME(state, payload) {
      state.time = payload;
    },
  },
  actions: {
    choseTask(context, status) {
      context.commit('NOWTASK', status);
    },
    getDate(context) {
      const date = {
        year: '',
        month: '',
        date: '',
        week: '',
        dateCode: '',
        showDate: '',
        id: '',
      };
      const getDate = new Date();
      let todayYear = getDate.getFullYear();
      let todayMonth = getDate.getMonth() + 1;
      let todayDate = getDate.getDate();
      date.week = getDate.getDay();
      date.showDate = `${todayYear}.${todayMonth}.${todayDate}`;
      date.year = todayYear;
      date.month = todayMonth;
      date.date = todayDate;
      date.id = getDate.getTime();
      todayYear += '';
      todayMonth += '';
      todayDate += '';
      date.dateCode = todayYear + todayMonth + todayDate;
      context.commit('DATE', date);
    },
    getData(context, dateCode) {
      const data = {
        all: [],
        todayAll: [],
        undone: [],
        less: [],
        completed: [],
      };
      context.dispatch('getDate');
      // eslint-disable-next-line no-prototype-builtins
      const check = localStorage.hasOwnProperty('task');
      if (!check) return;
      data.all = JSON.parse(localStorage.getItem('task'));
      if (data.all === null) return;
      data.all.forEach((item) => {
        if (item.dateCode === dateCode) {
          data.todayAll.push(item);
          if (!item.isComplete) data.undone.push(item);
          if (item.isComplete) data.completed.push(item);
        }
      });
      let index = 1;
      data.less = data.todayAll.reduce((prev, current) => {
        if (!current.isComplete && index < 5) {
          index += 1;
          prev.push(current);
        }
        return prev;
      }, []);
      context.commit('DATA', data);
    },
    taskActive(context, state) {
      context.commit('ISDOING', state);
    },
    messageDisplay(context, { message, display }) {
      context.commit('MESSAGE', { message, display });
    },
    getRing(context) {
      // eslint-disable-next-line no-prototype-builtins
      const check = localStorage.hasOwnProperty('ring');
      if (!check) return;
      const ring = JSON.parse(localStorage.getItem('ring'));
      context.commit('SELECTEDRING', ring);
    },
    getTime(context) {
      // eslint-disable-next-line no-prototype-builtins
      const check = localStorage.hasOwnProperty('time');
      if (!check) return;
      const time = JSON.parse(localStorage.getItem('time'));
      context.commit('TIME', time);
    },
  },
  getters: {
    date(state) {
      return state.date;
    },
    data(state) {
      return state.data;
    },
    setMinutes(state) {
      return state.setMinutes;
    },
    nowTask(state) {
      return state.nowTask;
    },
    isDoing(state) {
      return state.isDoing;
    },
    selectedRing(state) {
      return state.selectedRing;
    },
    time(state) {
      return state.time;
    },
  },
  modules: {
  },
});
