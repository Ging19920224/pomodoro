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
      v-for="(item, index) in data.less"
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
      v-for="(item, index) in data.undone"
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
      <div class="text-right mt-30" v-show="undoneNum > 4">
        <span
        class="taskList__more"
        @click="changeStatus"
        >{{ status }}...</span>
      </div>
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
      message: 'Add new task...',
      status: 'more',
    };
  },
  computed: {
    ...mapGetters(['date', 'data', 'nowTask', 'isDoing']),
    undoneNum() {
      return this.data.undone.length;
    },
  },
  created() {
    this.getDate();
  },
  mounted() {
    this.getData();
  },
  methods: {
    getDate() {
      this.$store.dispatch('getDate');
    },
    getData() {
      this.$store.dispatch('getData', this.date.dateCode);
    },
    messageDisplay(message, display) {
      this.$store.dispatch('messageDisplay', { message, display });
    },
    choseTask(index) {
      if (this.isDoing) {
        const message = '計時器正在進行中，請先暫停工作';
        this.messageDisplay(message, true);
        return;
      }
      const task = this.data.undone[index];
      if (task.id === this.nowTask) {
        this.$store.dispatch('choseTask', '');
        return;
      }
      this.$store.dispatch('choseTask', task.id);
    },
    addTask() {
      if (this.message === '') {
        const message = '任務名稱不得為空';
        this.messageDisplay(message, true);
        return;
      }
      this.getDate();
      const {
        showDate, dateCode, year, month, date, week, id,
      } = this.date;
      const task = {
        showDate,
        dateCode,
        year,
        month,
        date,
        week,
        id,
        message: this.message,
        isComplete: false,
      };
      const data = JSON.parse(JSON.stringify(this.data));
      data.all.push(task);
      localStorage.setItem('task', JSON.stringify(data.all));
      this.getData();
      this.message = 'Add new task...';
    },
    deleteTask(id) {
      if (id === this.nowTask) {
        const message = '不得刪除已選取的工作，欲刪除請先取消';
        this.messageDisplay(message, true);
        return;
      }
      const target = this.data.all.filter((item) => id === item.id);
      const index = this.data.all.indexOf(target[0]);
      const data = JSON.parse(JSON.stringify(this.data));
      data.all.splice(index, 1);
      localStorage.setItem('task', JSON.stringify(data.all));
      this.getData();
    },
    changeStatus() {
      if (this.status === 'more') {
        this.status = 'less';
      } else {
        this.status = 'more';
      }
    },
  },
};
</script>

<style>

</style>
