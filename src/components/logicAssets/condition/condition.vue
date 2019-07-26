<style lang="scss" scoped>
.st0{fill:#5CBB87;}
.st1{fill:#FFFFFF;}
.st2{font-family:'MicrosoftYaHei';}
.st3{font-size:18px;}
</style>

<template>
  <g
    data-type="condition"
    class="condition"
    inkscape:label="Layer 1"
    inkscape:groupmode="layer"
    :transform="'translate('+ x +','+ y +')'"
    :id="id">
    <polygon class="st0" points="159,0 15,0 0,17 15,34 159,34 174,17 	"/>
	  <text transform="matrix(1 0 0 1 24.0002 22.4186)" class="st1 st2 st3"
      dominant-baseline="middle"
      dy="-4"
      dx="62"
      text-anchor="middle"
    >{{ value[0][0] }}</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';
import { createModelMixin, eventMixin } from '@/utils/mixin/mixin'

@Component
export default class Condition extends Vue {
  @Prop(Boolean) model!: boolean;

  @Prop(Array) value!: Array<any>;

  @Prop(Number) y!: number;

  @Prop(Number) x!: number;

  @Prop(String) id!: string;

  mounted() {
    if (this.model) {
      createModelMixin.call(this)
    } else {
      eventMixin.call(this);
    }
  }
}
</script>
