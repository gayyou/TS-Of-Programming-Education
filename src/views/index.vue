<template>
  <div class="main">
    <left-list class="left-list"></left-list>
    <svg-canvas class="svg-canvas"></svg-canvas>
  </div>
</template>

<script>
import leftList from '../components/list/list.vue'
import drag from '../components/dragComponent/dragComponent.vue'
export default {
  components: {
    'left-list': leftList,
    'svg-canvas': drag,
  }
}
</script>

<style lang="scss">
.left-list {
  width: 1.52rem;
  height: 100%;
}

.svg-canvas {
  flex: 1;
  height: 100%;
}
</style>
