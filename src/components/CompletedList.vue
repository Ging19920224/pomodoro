<template>
  <div class="taskList">
    <div class="mt-30">
      <div
      class="taskList_list mt-25"
      v-for="(item, index) in data.completed"
      :key="`completed-${item.dateCode}-${index}`"
      >
        <span
        class="ds-inline-block border-circle taskList__point mr-25 text-center">
          <i class="fas fa-check"></i>
        </span>
        <span class="ds-inline-block taskList__context ellipsis">
          {{ item.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['date', 'data']),
  },
};
</script>
