<template>
  <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="100%"
      height="100%"
      version="1.1"
      inkscape:version="0.92.3 (2405546, 2018-03-11)"
      sodipodi:docname="绘图.svg">
      <defs
        id="defs2">
        <inkscape:path-effect
          effect="bspline"
          id="path-effect18"
          is_visible="true"
          weight="33.333333"
          steps="2"
          helper_size="0"
          apply_no_weight="true"
          apply_with_weight="true"
          only_selected="false" />
      </defs>
      <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="0.35"
        inkscape:cx="-98.571429"
        inkscape:cy="560"
        inkscape:document-units="mm"
        inkscape:current-layer="layer1"
        showgrid="false"
        inkscape:window-width="1920"
        inkscape:window-height="1001"
        inkscape:window-x="-9"
        inkscape:window-y="-9"
        inkscape:window-maximized="1" />
      <metadata
        id="metadata5">
        <rdf:RDF>
          <cc:Work
            rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
              rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <noRefFunc
        v-for="item in svgList.noRefFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></noRefFunc>
      <refFunc
        v-for="item in svgList.refFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></refFunc>
      <inOrder
        v-for="item in svgList.inOrder"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :svgOptions="item.svgOptions"
      >
      </inOrder>
      <circles
        v-for="item in svgList.circle"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :hasCdn="item.hasCdn"
        :svgOptions="item.svgOptions"
      ></circles>
      <judge
        v-for="item in svgList.judge"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :hasCdn="item.hasCdn"
        :svgOptions="item.svgOptions"
      ></judge>
      <assist
        v-for="item in svgList.assist"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></assist>
      <condition
        v-for="item in svgList.condition"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></condition>
      <order
        v-for="item in svgList.order"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></order>
      <doubleRef
        v-for=" item in svgList.doubleRef"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></doubleRef>
      <longRefFunc
        v-for=" item in svgList.longRefFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></longRefFunc>
      <longRightRef
        v-for=" item in svgList.longRightRef"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></longRightRef>
    </svg>
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
import { Prop } from 'vue-property-decorator'

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
  @Prop() svgList!: any;

  mounted() {
    let container = this.$el;
    setTimeout(() => {
      let result = getSvgCenterPosi(container);

      let { x, y, scales } = result;

      container.getElementsByTagName('g')[0].setAttribute('transform', 'translate(' + x + ',' + y + ') scale(' + scales + ')');
    }, 100);
  }
}
</script>
