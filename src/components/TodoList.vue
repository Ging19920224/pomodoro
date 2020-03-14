<template>
  <div class="taskList">
    <div>
      <input
      type="text"
      class="ds-inline-block taskList__input border-radius"
      v-model="message"
      @keyup.enter="addTask"
      >
      <button
      class="taskList_btn text-center ml-20"
      @click="addTask"
      >
        <i class="fas fa-plus-circle"></i>
        ADD
      </button>
    </div>
    <div class="mt-50">
      <div
      class="taskList_list mt-25"
      v-for="(item, index) in lessTask"
      :key="`more-${item.dateCode}-${index}`"
      v-show="status === 'more'"
      >
        <span
        class="ds-inline-block border-circle taskList__point mr-25"
        :class="{'bg-work':nowTask === item.id}"
        @click="choseTask(index)"
        ></span>
        <span
        class="ds-inline-block taskList__context ellipsis"
        @click="choseTask(index)"
        >
          {{ item.message }}
        </span>
        <span
        class="ds-inline-block taskList_delete ml-20"
        @click="deleteTask(item.id)"
        >
          <i class="fas fa-trash-alt"></i>
        </span>
      </div>
      <div
      class="taskList_list mt-25"
      v-for="(item, index) in unTask"
      :key="`less-${item.dateCode}-${index}`"
      v-show="status === 'less'"
      >
        <span
        class="ds-inline-block border-circle taskList__point mr-25"
        :class="{'bg-work':nowTask === item.id}"
        @click="choseTask(index)"
        ></span>
        <span
        class="ds-inline-block taskList__context ellipsis"
        @click="choseTask(index)"
        >
          {{ item.message }}
        </span>
        <span
        class="ds-inline-block taskList_delete ml-20"
        @click="deleteTask(item.id)"
        >
          <i class="fas fa-trash-alt"></i>
        </span>
      </div>
      <div class="text-right mt-30">
        <span
        class="taskList__more" v-if="todayTask > 4"
        @click="changeStatus"
        >{{ status }}...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Add new task...',
      nowTask: '',
      date: {
        year: '',
        month: '',
        date: '',
        week: '',
        dateCode: '',
        showDate: '',
        id: '',
      },
      unTask: [],
      lessTask: [],
      completedTask: [],
      status: 'more',
    };
  },
  computed: {
    todayTask() {
      const vm = this;
      return vm.unTask.length;
    },
  },
  mounted() {
    const vm = this;
    vm.getDate();
    vm.geOldtData();
  },
  methods: {
    getDate() {
      const vm = this;
      const getDate = new Date();
      let year = getDate.getFullYear();
      let month = getDate.getMonth() + 1;
      let date = getDate.getDate();
      vm.date.week = getDate.getDay();
      vm.date.showDate = `${year}.${month}.${date}`;
      vm.date.year = year;
      vm.date.month = month;
      vm.date.date = date;
      vm.date.id = getDate.getTime();
      year += '';
      month += '';
      date += '';
      vm.date.dateCode = year + month + date;
    },
    geOldtData() {
      const oldData = JSON.parse(localStorage.getItem('task'));
      const vm = this;
      if (oldData === null) return;
      vm.unTask = oldData.reduce((prev, current) => {
        if (current.dateCode === vm.date.dateCode && !current.isComplete) {
          prev.push(current);
        }
        return prev;
      }, []);
      vm.lessTask = oldData.reduce((prev, current, index) => {
        if (current.dateCode === vm.date.dateCode && !current.isComplete && index < 4) {
          prev.push(current);
        }
        return prev;
      }, []);
      vm.completedTask = oldData.reduce((prev, current) => {
        if (current.dateCode === vm.date.dateCode && current.isComplete) {
          prev.push(current);
        }
        return prev;
      }, []);
    },
    addTask() {
      const vm = this;
      vm.getDate();
      const {
        showDate, dateCode, year, month, date, week, id,
      } = vm.date;
      const task = {
        showDate,
        dateCode,
        year,
        month,
        date,
        week,
        id,
        message: vm.message,
        isComplete: false,
      };
      vm.unTask.push(task);
      const data = JSON.stringify(vm.unTask);
      localStorage.setItem('task', data);
      vm.geOldtData();
      vm.message = 'Add new task...';
    },
    choseTask(index) {
      const vm = this;
      const task = vm.unTask[index];
      vm.nowTask = task.id;
    },
    deleteTask(id) {
      const vm = this;
      const target = vm.unTask.filter((item) => id === item.id);
      const index = vm.unTask.indexOf(target[0]);
      vm.unTask.splice(index, 1);
      const data = JSON.stringify(vm.unTask);
      localStorage.setItem('task', data);
      vm.geOldtData();
    },
    changeStatus() {
      const vm = this;
      if (vm.status === 'more') {
        vm.status = 'less';
      } else {
        vm.status = 'more';
      }
    },
  },
};
</script>

<style>

</style>
