<style lang="scss" scoped>

</style>

<template>
  <div id="app">
    <head-nav></head-nav>
    <div class="main">
      <!-- <recommand
        class="recommand"
        :style="!$store.state.isCode ? 'z-index: 1' : 'z-index: 0'"
      ></recommand> -->
      <index
        class="index"
        :style="$store.state.isCode ? 'z-index: 1' : 'z-index: 0'"
      ></index>
    </div>
    <float-layer></float-layer>
    <loading></loading>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import circles from '../logicAssets/circle/circle.vue'
import judge from '../logicAssets/judge/judge.vue'
import order from '../logicAssets/order/order.vue'
import condition from '../logicAssets/condition/condition.vue'
import noRefFunc from '../logicAssets/noRefFunc/noRefFunc.vue'
import assist from '../logicAssets/assist/assist.vue'
import doubleRef from '../logicAssets/doubleRef/doubleRef.vue'
import longRefFunc from '../logicAssets/longRefFunc/longRefFunc.vue'
import longRightRef from '../logicAssets/longRightRef/longRightRef.vue'
import inOrder from '../logicAssets/inOrder/inOrder.vue'
import Component from 'vue-class-component'
import { getSvgCenterPosi } from '@/utils/recommend-utils'

@Component({
  components: {
    circles,
    judge,
    order,
    condition,
    noRefFunc,
    assist,
    doubleRef,
    longRefFunc,
    longRightRef,
    inOrder
  }
})
export default class MainComponent extends Vue {
  mounted() {
    let container = this.$el;
    setTimeout(() => {
      let result = getSvgCenterPosi(container);

      let { x, y, scales } = result;

      container.getElementsByTagName('g')[0].setAttribute('transform', 'translate(' + x + ',' + y + ') scale(' + scales + ')');
    }, 10);
  }
}
</script>
