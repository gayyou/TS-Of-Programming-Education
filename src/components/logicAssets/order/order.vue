<style lang="scss" scoped>
.st0{fill:#FEDB4C;}
.st1{fill:#FFFFFF;}
.st2{font-family:'MicrosoftYaHei';}
.st3{font-size:18px;}
</style>

<template>
  <g
    data-type="order"
    class="order"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     :transform="'translate('+ x +','+ y +')'"
     :id="id">
    <g>
      <path class="st0" d="M130.9,48H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4l126.9,0c13.3,0,24,10.7,24,24v0C154.9,37.3,144.2,48,130.9,48
        z"
        
        />
      <text transform="matrix(1 0 0 1 17.3338 30.5439)" class="st1 st2 st3">{{ value[0][0] }}</text>
      <text transform="matrix(1 0 0 1 107.5838 30.5439)" class="st1 st2 st3">{{ value[0][1] }}</text>
      <path class="st1" d="M88.9,38.1h-14c-7.2,0-13-5.8-13-13v0c0-7.2,5.8-13,13-13h14c7.2,0,13,5.8,13,13v0
        C101.9,32.3,96.1,38.1,88.9,38.1z"
        @click="textInput"
        transform="translate(0, 0)"
        data-index="0"
      />
    </g>
    <text
      @click="numberInput"
      transform="translate(78,30)"
      data-index="0"
      class="text cls-2"
      id="毫秒"
      style="font-size:16px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#000"
      dominant-baseline="middle"
      dy="-3.7"
      dx="4"
      text-anchor="middle"
    >{{ value[1][0] }}</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';
import { createModelMixin, eventMixin } from '@/utils/mixin/mixin'
import { changeInput } from '@/utils/input-operate/change-text-utils'

@Component
export default class Order extends Vue {
  @Prop(Boolean) model!: boolean;

  @Prop(Array) value!: Array<any>;

  @Prop(Number) y!: number;

  @Prop(Number) x!: number;

  @Prop(String) id!: string;

  @Prop(String) func!: string;

  mounted() {
    if (this.model) {
      createModelMixin.call(this)
    } else {
      eventMixin.call(this);
    }
  }

  textInput(event: any) {
    // 下面这两个没什么区别，区别主要是点击的不同，设置两个的原因是这两个东西其实不是嵌套的,不知道叫做什么，乱写名字，后期改
    changeInput.call(this, event, {
      x: -66,
      y: -13
    });
  }

  numberInput(event: any) {
    changeInput.call(this, event, {
      x: 10.8,
      y: 17.5
    });
  }
}
</script>
