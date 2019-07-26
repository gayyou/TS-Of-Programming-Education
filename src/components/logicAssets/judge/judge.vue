<style lang="scss" scoped>
.st0{fill:#57BFC3;}
.st1{fill:#FFFFFF;}
.st2{font-family:'MicrosoftYaHei';}
.st3{font-size:18px;}
.st4{fill:#1B8F8F;}
.st12 {
stroke-width: 4px;
stroke: yellow;
}
.layer {
stroke: none;
stroke-width: 0;
}
</style>

<template>
    <g
     data-type="judge"
     data-currentY="48"
     data-currentSecondY="120"
     data-firstBash="24"
     data-secondBash="-16"
     data-textBash="100"
     data-firstTime="1"
     class="judge"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate('+ x +','+ y +')'"
     :id="id">
    <g>
      <path d="M24,50 L100,50" class="st12 underline" fill="#000" stroke-width="3px" opacity="0"></path>
      <path class="st0 out-line choice-path" :d="'M140,24L140,24c0-13.3-10.7-24-24-24L12,0C5.4,0,0,5.4,0,12v36v24v48v' + svgOptions.firstBash + 'v12c0,6.6,5.4,12,12,12h46c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28c-2.2,0-4-1.8-4-4v'+ svgOptions.secondBash +' c0-2.2,1.8-4,4-4h88c13.3,0,24-10.7,24-24v0c0-13.3-10.7-24-24-24H28c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h88C129.3,48,140,37.3,140,24z'"/>
      <g transform="translate(110,0)" :style="hasCdn ? 'display: block' : 'display: none'" class="extend-line">
        <path class="st0 choice-path" d="M138,48H12C5.4,48,0,42.6,0,36V12C0,5.4,5.4,0,12,0l126,0c13.3,0,24,10.7,24,24v0C162,37.3,151.3,48,138,48z"	/>
        <path class="st0 layer" transform="translate(-60,0.6) scale(0.98)" d="M138,48H12C5.4,48,0,42.6,0,36V12C0,5.4,5.4,0,12,0l126,0c13.3,0,24,10.7,24,24v0C162,37.3,151.3,48,138,48z"	/>
      </g>
      <text transform="matrix(1 0 0 1 24.3335 30.3763)" class="st1 st2 st3">如果</text>
      <text :transform="'matrix(1 0 0 1 24.3335 ' + svgOptions.textBash + ')'" class="st1 st2 st3 else">否则</text>
      <polygon class="st4" :style="hasCdn ? 'display: none' : 'display: block'" points="106,12.3 82,12.3 70,25.3 82,38.3 106,38.3 118,25.3 	"/>
      <polygon class="st4" transform="translate(100, 11) scale(0.8)" :style="hasCdn ? 'display: block' : 'display: none'" points="159,0 15,0 0,17 15,34 159,34 174,17 	"/>
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
import noRefFunc from '../noRefFunc/noRefFunc.vue'
import condition from '../condition/condition.vue'
import circles from './circle.vue'
import assist from '../assist/assist.vue'
import order from '../order/order.vue'
import doubleRef from '../doubleRef/doubleRef.vue'
import longRefFunc from '../longRefFunc/longRefFunc.vue'
import longRightRef from '../longRightRef/longRightRef.vue'
import inOrder from '../inOrder/inOrder.vue'
import judge from '../judge/judge.vue'
import { Prop, Component } from 'vue-property-decorator';
import { VList } from '@/utils/interface/VList';
import { createModelMixin, eventMixin, componentListMixin } from '@/utils/mixin/mixin'

@Component({
  components: {
    noRefFunc,
    condition,
    assist,
    order,
    judge,
    longRightRef,
    longRefFunc,
    doubleRef,
    inOrder
  }
})
export default class Judge extends Vue {
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
      this.$options.components.circles = require('../circle/circle.vue').default
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
