<template>
  <div class="page">
    <p class="text-left page__title">
      TASK LIST
      <button
      class="btn ml-50"
      :class="{'btn-active':mode === 'undone'}"
      @click="changeMode('undone')"
      >undone</button>
      <button
      class="btn ml-10"
      :class="{'btn-active':mode === 'completed'}"
      @click="changeMode('completed')"
      >completed</button>
    </p>
    <TodoList v-if="mode === 'undone'"></TodoList>
    <Completed v-else></Completed>
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue';
import Completed from '../components/CompletedList.vue';

export default {
  components: {
    TodoList,
    Completed,
  },
  data() {
    return {
      mode: 'undone',
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
    },
  },
};
</script>
