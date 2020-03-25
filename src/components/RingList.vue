<template>
  <div class="container mt-30 text-center">
    <div
    class="ring__box ds-inline-block border-radius position-relative mt-20"
    v-for="(item, index) in ring"
    :key="`ringBox-${index}`"
    :class="{'ring__box-active':item.name === selectedRing.name}"
    @click="chooseRing(item.name, item.id)"
    >
      <span
      class="ring__point position-absolute border-circle ds-inline-block"
      :class="{'ring-active':item.name === selectedRing.name}"
      >
        <i class="fas fa-check" v-show="item.name === selectedRing.name"></i>
      </span>
      <span class="ring__name position-absolute">{{ item.name }}</span>
      <span
      class="position-absolute ring__play"
      :class="{'ring-active':item.name === selectedRing.name}"
      @click="play(item.id)">
        <i class="fas fa-play-circle"></i>
      </span>
    </div>
    <audio id="audio-0" src="../assets/ring/default.mp3"></audio>
    <audio id="audio-1" src="../assets/ring/bell.mp3"></audio>
    <audio id="audio-2" src="../assets/ring/birds.mp3"></audio>
    <audio id="audio-3" src="../assets/ring/classic.mp3"></audio>
    <audio id="audio-4" src="../assets/ring/opening.mp3"></audio>
    <audio id="audio-5" src="../assets/ring/whatFlash.mp3"></audio>
    <audio id="audio-6" src="../assets/ring/alert.mp3"></audio>
    <audio id="audio-7" src="../assets/ring/warning.mp3"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: false,
      ring: [
        {
          name: 'default',
          id: 'audio-0',
        },
        {
          name: 'bell',
          id: 'audio-1',
        },
        {
          name: 'birds',
          id: 'audio-2',
        },
        {
          name: 'classic',
          id: 'audio-3',
        },
        {
          name: 'opening',
          id: 'audio-4',
        },
        {
          name: '國棟 - 這什麼到底什麼閃現！',
          id: 'audio-5',
        },
        {
          name: 'alert',
          id: 'audio-6',
        },
        {
          name: 'warning',
          id: 'audio-7',
        },
      ],
    };
  },
  computed: {
    nowUrl() {
      return this.playUrl;
    },
    selectedRing() {
      return this.$store.state.selectedRing;
    },
  },
  mounted() {
    this.getRing();
  },
  methods: {
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
    getRing() {
      this.$store.dispatch('getRing');
    },
    chooseRing(name, id) {
      const obj = {
        name,
        id,
      };
      localStorage.setItem('ring', JSON.stringify(obj));
      this.getRing();
    },
  },
};
</script>

<style>

</style>
