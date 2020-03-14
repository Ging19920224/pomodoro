<template>
  <div class="page">
    <p class="text-left page__title">TASK LIST</p>
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue';

export default {
  components: {
    TodoList,
  },
};
</script>
