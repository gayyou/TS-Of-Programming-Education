<style lang="scss" scoped>
.st0{fill:#FEDB4C;}
.st1{fill:#FFFFFF;}
.st2{font-family:'MicrosoftYaHei';}
.st3{font-size:18px;}
</style>

<template>
  <g
    data-type="assist"
    class="assist"
    inkscape:label="Layer 1"
    inkscape:groupmode="layer"
    :transform="'translate('+ x +','+ y +')'"
    :id="id"
  >
	<path class="st0" d="M102,48H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h98c13.3,0,24,10.7,24,24v0C126,37.3,115.3,48,102,48z"/>
	<text transform="translate(40,28)" class="st1 st2 st3"
    dominant-baseline="middle"
    dy="-3.7"
    dx="20"
    text-anchor="middle"
  >{{ value[0][0] }}</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';
import { createModelMixin, eventMixin } from '@/utils/mixin/mixin'

@Component
export default class Assist extends Vue {
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
}
</script>
