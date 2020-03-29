<template>
  <div>
    <div
    class="message border-radius text-center"
    :class="{'message-active':display}"
    >
      <span
      class="message__btn position-absolute ds-inline-block"
      @click="closeMessage('', false)"
      >
        <i class="fas fa-times-circle"></i>
      </span>
      <p class="position-absolute">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.state.message.message;
    },
    display() {
      if (this.$store.state.message.display) this.closeMessageTimeout();
      return this.$store.state.message.display;
    },
  },
  methods: {
    closeMessageTimeout(message = '', display = false) {
      setTimeout(() => {
        this.$store.dispatch('messageDisplay', { message, display });
      }, 2500);
    },
    closeMessage(message = '', display = false) {
      this.$store.dispatch('messageDisplay', { message, display });
    },
  },
};
</script>
