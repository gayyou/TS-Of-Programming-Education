<template>
  <div class="recommand">
    <el-scrollbar class="recommand-list-container">
      <div class="container" @click="choiceRec">
        <rec-list
          v-for="(item, index) in list"
          :key="item.id"
          :index="index"
          :name="item.name"
          :point="item.point"
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
import Vue from "vue";
import Component from "vue-class-component";
import PubSub from "pubsub-js";
import recList from "./recList/recList.vue";
import { cloneList } from "@/utils/shared/vlist-utils";
import { dataToView } from "@/utils/models/data-to-view";
import { adjustRecommandSvgOperateRoot } from "@/utils/svg-operate/dom-operate";
import { getVList } from "@/utils/models/get-instance";

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

  list: Array<any> = [];

  mounted() {
    let t = getVList();
    t.circle.push({
      x: 507,
      y: 156,
      width: 332,
      height: 216,
      id: "cel0",
      type: "circle",
      value: ["循环"],
      svgOptions: { firstBash: 156, currentY: 192 },
      contain: {
        condition: [
          {
            x: 140,
            y: 7,
            width: 174,
            height: 34,
            id: "cel2",
            type: "condition",
            value: [["顺序代码执行完毕"], ["order"]],
            func: null
          }
        ],
        order: [],
        assist: [],
        noRefFunc: [],
        refFunc: [],
        circle: [],
        judge: [],
        doubleRef: [],
        longRefFunc: [],
        longRightRef: [
          {
            x: 24,
            y: 48,
            width: 248,
            height: 48,
            id: "cel1",
            type: "longRightRef",
            value: [["向前移动", "步"], [10]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 96,
            width: 248,
            height: 48,
            id: "cel4",
            type: "longRightRef",
            value: [["向左转动", "度"], [20]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 144,
            width: 248,
            height: 48,
            id: "cel8",
            type: "longRightRef",
            value: [["向后移动", "步"], [20]],
            func: "move_arm_high_up"
          }
        ],
        inOrder: []
      },
      hasCdn: true
    });
    let item2 = {
      id: "321",
      contain: t,
      point: 6.0
    };
    let t2 = getVList();
    let item3 = {
      id: "213",
      point: 7.5,
      contain: {
        condition: [],
        order: [],
        assist: [],
        noRefFunc: [],
        refFunc: [],
        circle: [
          {
            x: 534,
            y: 80,
            width: 332,
            height: 384.5,
            id: "del0",
            type: "circle",
            value: ["循环"],
            svgOptions: { firstBash: 324.5, currentY: 360.5 },
            contain: {
              condition: [
                {
                  x: 140,
                  y: 7,
                  width: 174,
                  height: 34,
                  id: "del4",
                  type: "condition",
                  value: [["顺序代码执行完毕"], ["order"]],
                  func: null
                }
              ],
              order: [],
              assist: [],
              noRefFunc: [],
              refFunc: [],
              circle: [],
              judge: [
                {
                  x: 24,
                  y: 48,
                  width: 272,
                  height: 264.5,
                  id: "del1",
                  type: "judge",
                  value: ["判断"],
                  svgOptions: {
                    firstBash: 120.5,
                    secondBash: -40.5,
                    textBash: 172.5,
                    currentY: 48,
                    firstTime: 1,
                    currentSecondY: 120
                  },
                  contain: {
                    condition: [
                      {
                        x: 80,
                        y: 7,
                        width: 174,
                        height: 34,
                        id: "del5",
                        type: "condition",
                        value: [["前方有障碍物"], ["order"]],
                        func: null
                      }
                    ],
                    order: [],
                    assist: [],
                    noRefFunc: [],
                    refFunc: [],
                    circle: [],
                    judge: [],
                    doubleRef: [],
                    longRefFunc: [],
                    longRightRef: [
                      {
                        x: 24,
                        y: 192,
                        width: 248,
                        height: 48,
                        id: "del3",
                        type: "longRightRef",
                        value: [["向前移动", "步"], [20]],
                        func: "move_arm_high_up"
                      },
                      {
                        x: 24,
                        y: 96,
                        width: 248,
                        height: 48,
                        id: "del6",
                        type: "longRightRef",
                        value: [["向后移动", "步"], [10]],
                        func: "move_arm_high_up"
                      },
                      {
                        x: 24,
                        y: 48,
                        width: 248,
                        height: 48,
                        id: "del7",
                        type: "longRightRef",
                        value: [["向左转动", "度"], [90]],
                        func: "move_arm_high_up"
                      }
                    ],
                    inOrder: []
                  },
                  hasCdn: true
                }
              ],
              doubleRef: [],
              longRefFunc: [],
              longRightRef: [
                {
                  x: 24,
                  y: 312,
                  width: 248,
                  height: 48,
                  id: "del8",
                  type: "longRightRef",
                  value: [["向前移动", "步"], [30]],
                  func: "move_arm_high_up"
                }
              ],
              inOrder: []
            },
            hasCdn: true
          }
        ],
        judge: [],
        doubleRef: [],
        longRefFunc: [],
        longRightRef: [],
        inOrder: []
      }
    };
    let t3 = getVList();

    t3.circle.push({
      x: 611,
      y: 240,
      width: 332,
      height: 216,
      id: "el9",
      type: "circle",
      value: ["循环"],
      svgOptions: { firstBash: 156, currentY: 192 },
      contain: {
        condition: [
          {
            x: 140,
            y: 7,
            width: 174,
            height: 34,
            id: "eel10",
            type: "condition",
            value: [["前方有障碍物"], ["order"]],
            func: null
          }
        ],
        order: [],
        assist: [],
        noRefFunc: [],
        refFunc: [],
        circle: [],
        judge: [],
        doubleRef: [],
        longRefFunc: [],
        longRightRef: [
          {
            x: 24,
            y: 48,
            width: 248,
            height: 48,
            id: "eel8",
            type: "longRightRef",
            value: [["向前移动", "步"], [40]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 96,
            width: 248,
            height: 48,
            id: "eel11",
            type: "longRightRef",
            value: [["向左转动", "度"], [30]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 144,
            width: 248,
            height: 48,
            id: "eel12",
            type: "longRightRef",
            value: [["向前移动", "步"], [40]],
            func: "move_arm_high_up"
          }
        ],
        inOrder: []
      },
      hasCdn: true
    });
    let item4 = {
      id: "123",
      contain: t3,
      name: "",
      point: 5.0
    };
    let t22 = getVList();
    t22.circle.push({
      x: 538,
      y: 137,
      width: 332,
      height: 216,
      id: "efl1",
      type: "circle",
      value: ["循环"],
      svgOptions: { firstBash: 156, currentY: 192 },
      contain: {
        condition: [
          {
            x: 140,
            y: 7,
            width: 174,
            height: 34,
            id: "efl7",
            type: "condition",
            value: [["前方有障碍物"], ["order"]],
            func: null
          }
        ],
        order: [],
        assist: [],
        noRefFunc: [],
        refFunc: [],
        circle: [],
        judge: [],
        doubleRef: [],
        longRefFunc: [],
        longRightRef: [
          {
            x: 24,
            y: 48,
            width: 248,
            height: 48,
            id: "efl4",
            type: "longRightRef",
            value: [["向左转动", "度"], [90]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 96,
            width: 248,
            height: 48,
            id: "fel5",
            type: "longRightRef",
            value: [["向前移动", "步"], [10]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 144,
            width: 248,
            height: 48,
            id: "efl6",
            type: "longRightRef",
            value: [["向左转动", "度"], [90]],
            func: "move_arm_high_up"
          }
        ],
        inOrder: []
      },
      hasCdn: true
    });
    let item5 = {
      id: "321",
      contain: t22,
      point: 4.2
    };
    let tt222 = getVList();
    tt222.circle.push({
      x: 599,
      y: 105,
      width: 332,
      height: 312,
      id: "22el0",
      type: "circle",
      value: ["循环"],
      svgOptions: { firstBash: 252, currentY: 288 },
      contain: {
        condition: [
          {
            x: 140,
            y: 7,
            width: 174,
            height: 34,
            id: "e2l6",
            type: "condition",
            value: [["顺序代码执行完毕"], ["order"]],
            func: null
          }
        ],
        order: [],
        assist: [
          {
            x: 24,
            y: 96,
            width: 126,
            height: 48,
            id: "e2l4",
            type: "assist",
            value: [["连接机器人"], []],
            func: null
          },
          {
            x: 24,
            y: 192,
            width: 126,
            height: 48,
            id: "e2l5",
            type: "assist",
            value: [["松开机器人"], []],
            func: null
          }
        ],
        noRefFunc: [],
        refFunc: [],
        circle: [],
        judge: [],
        doubleRef: [],
        longRefFunc: [],
        longRightRef: [
          {
            x: 24,
            y: 48,
            width: 248,
            height: 48,
            id: "el211",
            type: "longRightRef",
            value: [["向前移动", "步"], [4]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 144,
            width: 248,
            height: 48,
            id: "el23",
            type: "longRightRef",
            value: [["向前移动", "步"], [2]],
            func: "move_arm_high_up"
          },
          {
            x: 24,
            y: 240,
            width: 248,
            height: 48,
            id: "e2l2",
            type: "longRightRef",
            value: [["向后移动", "步"], [4]],
            func: "move_arm_high_up"
          }
        ],
        inOrder: []
      },
      hasCdn: true
    });
    this.list.push({
      id: "123123",
      point: 6.4,
      contain: tt222
    });
    this.list.push(item2);
    this.list.push(item3);
    this.list.push(item4);
    this.list.push(item5);
    this.$nextTick(() => {
      // for (let i = 0; i < this.list.length; i++) {
      //   adjustRecommandSvgOperateRoot(this.list[i].contain);
      // }
    });
    setTimeout(() => {
      // adjustRecommandSvgOperateRoot.call(this, item.contain);
    }, 50);
  }

  recommandToMain(e: any, data: any) {
    if (data.confirm) {
      let $container = $("#container");
      let width = $container.width() || 0;
      this.$data.list[this.index].contain.circle[0].x = width / 2;
      this.$data.list[this.index].contain.circle[0].y = 50;
      this.$store.state.isCode = true;
      // 将推荐页面中的列表复制到编码模式中，从而实现编码过程
      cloneList(
        this.$data.list[this.index].contain,
        this.$store.state.canvasList
      );

      setTimeout(() => {
        this.$store.state.isRenew = !this.$store.state.isRenew;
        setTimeout(() => {
          // let target = $(
          //   "#main-svg-container #" + this.$data.option.target + " .out-line"
          // )[0];
          // target.setAttribute("d", this.$data.option.nextD);
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
      return;
    }
    this.$store.state.showConfirm = true;
    this.$data.eventTarget = event.target;
    let name = event.target.getAttribute("data-name");
    this.$store.state.confirmMes =
      "系统不会保存您之前在编程页面所组件的命令块，是否要继续使用推荐方案" +
      "" +
      "？";
    this.subToken = PubSub.subscribe("checkRecommand", this.recommandToMain);
    this.index = parseInt(event.target.getAttribute("data-index"));
  }
}
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
