<style lang="scss" scoped>
.st0{fill:#E05857;}
.st1{fill:#FFFFFF;}
.st2{font-family:'MicrosoftYaHei';}
.st3{font-size:18px;}
</style>

<template>
  <g
    class="longRightRef"
    data-type="longRightRef"
    :transform="'translate('+ x +','+ y +')'"
    :id="id"
  >
    <path class="st0" d="M224,48H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h220c13.3,0,24,10.7,24,24v0C248,37.3,237.3,48,224,48z"/>
    <text transform="matrix(1 0 0 1 11.2505 29.4182)" class="st1 st2 st3">{{ value[0][0] }}</text>
    <text transform="matrix(1 0 0 1 208.5838 29.4178)" class="st1 st2 st3">{{ value[0][1] }}</text>
    <path class="st1" transform="translate(117, 0)" d="M72.9,37h-14c-7.1,0-13-5.8-13-13v0c0-7.1,5.8-13,13-13h14c7.1,0,13,5.8,13,13v0C85.9,31.2,80.1,37,72.9,37z"
      @click="textInput"
      data-index="0"
      />
      <text
      @click="numberInput"
      data-index="0"
      transform="translate(78,30)"
      class="text cls-2"
      id="毫秒"
      style="font-size:16px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#000"
      dominant-baseline="middle"
      dy="-3.9"
      dx="105"
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
export default class LongRightRef extends Vue {
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
      x: -50,
      y: -12.5
    });
  }

  numberInput(event: any) {
    changeInput.call(this, event, {
      x: -89,
      y: 17.5
    });
  }
}
</script>
