<template>
  <div class="time position-fixed">
    <h2 class="text-center">
      <i class="far fa-clock"></i>
      PM 03:25
    </h2>
    <div class="time__clock border-circle position-relative">
      <div class="time__view border-circle position-absolute">
        <span class="position-absolute time__font">25:00</span>
      </div>
    </div>
    <div class="mt-30">
      <button class="time__btn">Start</button>
    </div>
    <div class="time__pointGroup mt-30">
      <span class="time__point border-circle mr-25 time__point-active"></span>
      <span class="time__point border-circle mr-25"></span>
      <span class="time__point border-circle mr-25"></span>
      <span class="time__point border-circle"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Time',
};
</script>

<style>

</style>
