<template>
  <div class="main">
    <left-list class="left-list"></left-list>
    <svg-canvas class="svg-canvas"></svg-canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import leftList from '../components/list/list.vue'
import drag from '../components/dragComponent/dragComponent.vue'
import Component from 'vue-class-component';

@Component({
  components: {
    'left-list': leftList,
    'svg-canvas': drag,
  }
})
export default class Index extends Vue {

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
