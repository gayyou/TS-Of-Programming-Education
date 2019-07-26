<style lang="scss" scoped>
.st0{fill:#57BFC3;}
.st1{fill:#1B8F8F;}
.st2{fill:#FFFFFF;}
.st3{font-family:'MicrosoftYaHei';}
.st4{font-size:18px;}
.st12 {
  stroke-width: 4px;
  stroke: yellow;
}
.layer {
  stroke: #57BFC3;
  stroke-width: 0px;
}
</style>

<template>
    <g
    class="circle"
    data-type="circle"
    :transform="'translate('+ x +','+ y +')'"
    data-currentBash="24"
    data-currentY="48"
    :id="id"
  >
    <g>
      <path d="M24,50 L180,50" class="st12 underline" fill="#000" stroke-width="3px" opacity="0"></path>
      <path class="st0 out-line choice-path" :d="'M184.2,0H12C5.4,0,0,5.4,0,12v'+ svgOptions.firstBash + 'v24v12c0,6.6,5.4,12,12,12h62c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h156.2c13.3,0,24-10.7,24-24v0C208.2,10.7,197.4,0,184.2,0z'"/>
      <polygon class="st1 poly" :style="hasCdn ? 'display: none' : 'display: block'" points="172.2,11.4 148.2,11.4 136.2,24.4 148.2,37.4 172.2,37.4 184.2,24.4 	"/>
      <g transform="translate(170,0)" :style="hasCdn ? 'display: block' : 'display: none'" class="extend-line">
        <path class="st0 choice-path" d="M138,48H12C5.4,48,0,42.6,0,36V12C0,5.4,5.4,0,12,0l126,0c13.3,0,24,10.7,24,24v0C162,37.3,151.3,48,138,48z"	/>
        <path class="st0 layer" transform="translate(-60,0.6) scale(0.98)" d="M138,48H12C5.4,48,0,42.6,0,36V12C0,5.4,5.4,0,12,0l126,0c13.3,0,24,10.7,24,24v0C162,37.3,151.3,48,138,48z"	/>
      </g>
      <polygon class="st1" transform="translate(155, 11) scale(0.8)" :style="hasCdn ? 'display: block' : 'display: none'" points="159,0 15,0 0,17 15,34 159,34 174,17 	"/>
      <text transform="matrix(1 0 0 1 23.3337 30.7092)" class="st2 st3 st4">执行命令直到</text>
    </g>
    <noRefFunc
      v-for="item in $data.contain.noRefFunc"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></noRefFunc>
    <template v-if="$data.contain.circle.length != 0">
      <circles
        v-for="item in $data.contain.circle"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :hasCdn="item.hasCdn"
        :svgOptions="item.svgOptions"
      ></circles>
    </template>
    <template  v-if="$data.contain.judge.length != 0">
      <judge
        v-for="item in $data.contain.judge"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :hasCdn="item.hasCdn"
        :svgOptions="item.svgOptions"
      ></judge>
    </template>
    <template  v-if="$data.contain.inOrder.length != 0">
      <inOrder
        v-for="item in $data.contain.inOrder"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :svgOptions="item.svgOptions"
      ></inOrder>
    </template>
    <assist
      v-for="item in $data.contain.assist"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></assist>
    <condition
      v-for="item in $data.contain.condition"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></condition>
    <order
      v-for="item in $data.contain.order"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
    ></order>
    <doubleRef
      v-for=" item in $data.contain.doubleRef"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
      :model="false"
    ></doubleRef>
    <longRefFunc
      v-for=" item in $data.contain.longRefFunc"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
      :model="false"
    ></longRefFunc>
    <longRightRef
      v-for=" item in $data.contain.longRightRef"
      :key="item.id"
      :y="item.y"
      :x="item.x"
      :id="item.id"
      :value="item.value"
      :model="false"
    ></longRightRef>
    <div v-if="$store.state.isRenew"></div>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';
import { createModelMixin, eventMixin, componentListMixin } from '@/utils/mixin/mixin'
import noRefFunc from '../noRefFunc/noRefFunc.vue'
import condition from '../condition/condition.vue'
import circles from './circle.vue'
import assist from '../assist/assist.vue'
import order from '../order/order.vue'
import doubleRef from '../doubleRef/doubleRef.vue'
import longRefFunc from '../longRefFunc/longRefFunc.vue'
import longRightRef from '../longRightRef/longRightRef.vue'
import inOrder from '../inOrder/inOrder.vue'
import { VList } from '@/utils/interface/VList';

@Component({
  components: {
    noRefFunc,
    condition,
    assist,
    order,
    circles,
    longRightRef,
    longRefFunc,
    doubleRef,
    inOrder
  }
})
export default class Circles extends Vue {
  @Prop(Boolean) model!: boolean;

  @Prop(Array) value!: Array<any>;

  @Prop(Number) y!: number;

  @Prop(Number) x!: number;

  @Prop(String) id!: string;

  @Prop(Boolean) hasCdn!: boolean;

  @Prop(Object) containObject!: VList;

  @Prop(Object) svgOptions!: any;

  contain: VList = {
    order: [],
    judge: [],
    condition: [],
    assist: [],
    noRefFunc: [],
    circle: [],
    inOrder: [],
    refFunc: [],
    doubleRef: [],
    longRefFunc: [],
    longRightRef: []
  }

  beforeCreate() {
    if (this.$options.components) {
      this.$options.components.judge = require('../judge/judge.vue').default
    }
  }

  mounted() {
    if (this.model) {
      createModelMixin.call(this)
    } else {
      eventMixin.call(this);
      componentListMixin(this.containObject);
      this.$nextTick(() => {
        // 等待下一个事件循环的时候进行引用的指向
        this.$data.contain = this.containObject;
      });
    }
  }
}
</script>
