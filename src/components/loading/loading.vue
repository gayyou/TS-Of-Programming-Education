<style lang="scss" scoped>
.loading-words {
  font-family: 'HYZhuZiMuTouRen';
  position: absolute;
  font-size: 36px;
  width: 250px;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  bottom: -60px;
}
.load-container {
    position: fixed;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .loading-icon-container {
    position: absolute;
    width: 5rem;
    height: 5rem;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-60%);
  }
  .shadow-line {
    position: absolute;
    bottom: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 5rem;
  }
  .shadow-line>img {
    display: block;
    width: 100%;
  }
  .shadow-line::after {
    content: "";
    display: block;
    clear: both;
  }
  .center-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 7rem;
    height: 7rem;
  }
  .center-icon {
    position: absolute;
    // top: 0;
    // left: 0;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 5rem;
    height: 5rem;
    animation: icon-move 2.5s ease-in-out 0s infinite;
    /* box-shadow: 0 0 16px 4px rgba(0, 0, 0, .3); */
  }
  .bubble-container li {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    overflow: hidden;
    transform-origin: 0 4.4rem;
    top: -4.4rem;
  }
  .bubble-container li img {
    width: 1.7rem;
    height: 1.7rem;
  }
  @keyframes icon-move {
    /* 0% {
      transform: translateY(0%);
    } */
    /* 20% {
      transform: translateY(-50%);
    } */
    50% {
      transform: translateX(-50%) translateY(-80%);
    }
    /* 70% {
      transform: translateY(50%);
    } */
    100% {
      transform: translateX(-50%) translateY(-50%);
    }
    /* 100% {
      transform: translateY(0%);
    } */
  }
</style>

<template>
  <div id="page-loading" class="load-container" v-if="!$store.state.close" :class="$store.state.loadingFadeIn ? 'fade-in' : 'fade-out'">
    <div class="loading-icon-container">
    <div class="center-container">
      <img class="center-icon" src='../../assets/studio_bulb.png' alt="">
    </div>
    <div class="shadow-line">
      <img src="https://qgstudio.oss-cn-shenzhen.aliyuncs.com/images/background/shadow_line.png" alt="">
    </div>
      <span class="loading-words">{{$store.state.str}}{{ $store.state.point }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class Loading extends Vue {
  mounted() {
    this.abc(0)
  }

  abc(num: number) {
    if (num == 4) {
      num = 0;
    }
    this.$data.id = setTimeout(() => {
      let str = '';
      for (let i = 0; i < num; i++) {
        str += '.';
      }
      this.$store.state.point = str;
      num++;
      if (this.$store.state.str !== '编译成功') {
        this.abc(num);
      } else {
        clearTimeout(this.$data.id);
      }
    }, 500);
  }
}
</script>
