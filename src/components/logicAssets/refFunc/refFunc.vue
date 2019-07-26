<style lang="scss" scoped>

</style>

<template>
  <g
    class="refFunc"
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     data-type="refFunc"
     :transform="'translate('+ x +','+ y +')'"
     :id="id">
    <g
       transform="translate(-195,-561)"
       data-name="组 5"
       id="组_5">
      <path
         transform="translate(193,560)"
         d="m 12,0 h 186 a 24,24 0 0 1 24,24 v 0 a 24,24 0 0 1 -24,24 h -186 a 12,12 0 0 1 -12,-12 v -24 a 12,12 0 0 1 12,-12 z"
         class="cls-1"
         data-name="矩形 21"
         id="矩形_21"
         inkscape:connector-curvature="0"
         style="fill:#ed5a5a" />
      <text
         transform="translate(265,591)"
         class="cls-2"
         id="引脚置为高电平"
         style="font-size:18px;font-family:MicrosoftYaHei, 'Microsoft YaHei';fill:#ffffff">
        <tspan
           id="tspan7"
           y="0"
           x="0">{{ value }}</tspan>
      </text>
      <rect
         transform="translate(217,571)"
         rx="13"
         height="26"
         width="40"
         class="cls-3"
         data-name="矩形 22"
         id="矩形_22"
         x="0"
         y="0"
         style="fill:#ffffff" />
    </g>
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';
import { createModelMixin, eventMixin } from '@/utils/mixin/mixin'

@Component
export default class RefFunc extends Vue {
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
