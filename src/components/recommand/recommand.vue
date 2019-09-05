<template>
  <div class="recommand">
    <el-scrollbar class="recommand-list-container">
      <div class="container" @click="choiceRec">
        <rec-list
          v-for="(item, index) in list"
          :key="item.id"
          :index="index"
          :name="'把物品放后面'"
          :point="9.5"
          :svgList="item.contain"
        ></rec-list>
        <!-- <rec-list
          :name="'拾起物品'"
          :point="9.5"
          :svgList="$data.list"
        ></rec-list>
        <rec-list
          :name="'放下物品'"
          :point="9"
          :svgList="$data.list"
        ></rec-list>
        <rec-list
          :name="'拾起物品后后转放下'"
          :point="9"
          :svgList="$data.list"
        ></rec-list>-->
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import PubSub from "pubsub-js";
import recList from "./recList/recList.vue";
import { cloneList } from '@/utils/shared/vlist-utils';
import { dataToView } from '@/utils/models/data-to-view';
import { adjustRecommandSvgOperate } from '@/utils/svg-operate/dom-operate';

@Component({
  components: {
    "rec-list": recList
  }
})
export default class RecommandPage extends Vue {
  eventTarget: any = null;

  index: number = 1;

  option: any = null;

  subToken: any = null;

  list: Array<any> = [
    
  ];

  mounted() {
    let obj = {"condition":[],"order":[],"assist":[],"noRefFunc":[],"refFunc":[],"doubleRef":[],"longRefFunc":[],"longRightRef":[],"inOrder":[],"circle":[{"id":"recEl0","type":"circle","y":1,"x":0,"svgOptions":{"firstBash":36,"currentY":48},"hasCdn":false,"contain":{"condition":[],"order":[],"assist":[],"noRefFunc":[],"refFunc":[],"doubleRef":[],"longRefFunc":[],"longRightRef":[],"inOrder":[],"circle":[],"judge":[{"id":"recEl1","type":"judge","y":0.2,"x":0,"svgOptions":{"firstBash":24,"secondBash":-16,"textBash":100.3763,"currentY":48,"firstTime":1,"currentSecondY":120},"hasCdn":false,"contain":{"condition":[],"order":[],"assist":[],"noRefFunc":[],"refFunc":[],"doubleRef":[],"longRefFunc":[],"longRightRef":[{"type":"longRightRef","id":"recEl2","func":"move_arm_right","y":100.4763,"x":1,"value":[["机械臂向左摆动","度"],["1"]]},{"type":"longRightRef","id":"recEl6","func":"move_arm_right","y":100.4763,"x":1,"value":[["机械臂向左摆动","度"],["1"]]}],"inOrder":[],"circle":[{"id":"recEl3","type":"circle","y":100.5763,"x":0,"svgOptions":{"firstBash":36,"currentY":48},"hasCdn":false,"contain":{"condition":[],"order":[],"assist":[],"noRefFunc":[],"refFunc":[],"doubleRef":[],"longRefFunc":[],"longRightRef":[{"type":"longRightRef","id":"recEl4","func":"move_arm_right","y":0.2,"x":1,"value":[["机械臂向左摆动","度"],["1"]]}],"inOrder":[],"circle":[],"judge":[]}}],"judge":[]}}]}}],"judge":[]}
    let item = {
      id: "123",
      contain: obj
    }
    this.list.push(item)
    this.$nextTick(() => {
      adjustRecommandSvgOperate(item.contain);
    })
    dataToView;
  }

  recommandToMain(e: any, data: any) {
    if (data.confirm) {
      let $container = $("#container");
      let width = $container.width() || 0;
      this.$data.list.circle[0].x = width / 2;
      this.$data.list.circle[0].y = 50;
      let index = this.$data.eventTarget.getAttribute("index");
      this.$store.state.isCode = true;

      // 将推荐页面中的列表复制到编码模式中，从而实现编码过程
      cloneList(this.$data.list, this.$store.state.canvasList);

      setTimeout(() => {
        this.$store.state.isRenew = !this.$store.state.isRenew;
        setTimeout(() => {
          let target = $(
            "#main-svg-container #" + this.$data.option.target + " .out-line"
          )[0];
          target.setAttribute("d", this.$data.option.nextD);
        }, 10);
      }, 0);
      return;
    }
    if (data.cancel) {
      // 点击取消时候发生的事情
    }
    PubSub.unsubscribe(this.$data.subToken);
  }

  choiceRec(event: any) {
    if (event.target == event.currentTarget) {
      return ;
    }
    this.$store.state.showConfirm = true;
    this.$data.eventTarget = event.target;
    let name = event.target.getAttribute("data-name");
    this.$store.state.confirmMes =
      "系统不会保存您之前在编程页面所组件的命令块，是否要继续使用推荐方案:" +
      name +
      "？";
  }
};
</script>

<style lang="scss">
$bgColor: #f5f1ef;

%clear-float::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}
%flex-center {
  display: flex;
  // justify-content: center;
}

.recommand {
  background-color: $bgColor;

  div {
    overflow-x: hidden !important;
  }
  .container {
    @extend %clear-float;
    @extend %flex-center;

    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 0.46rem;
  }
}
.recommand {
  flex: 1;
}
.recommand-list-container {
  height: 100%;
}
.el-scrollbar__wrap,
.container {
  overflow-x: hidden;
}
.el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.3) !important;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
</style>
