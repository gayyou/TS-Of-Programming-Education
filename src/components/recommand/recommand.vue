<template>
  <div class="recommand">
    <el-scrollbar class="recommand-list-container">
      <div class="container" 
        @click="choiceRec"
      >
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
        ></rec-list> -->
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { nestWhileOperate } from '../../utils/svgOperate/changeSvgContainer.js';
import { cloneList } from '../../utils/shared/listUtils.js';
import PubSub from 'pubsub-js'
import recList from './recList/recList.vue';
export default {
  components: {
    'rec-list': recList
  },
  data() {
    return {
      eventTarget: null,
      index: 1,
      option: null,
      subToken: null,
      list: [
        {
          id: 'name1',
          name: 'name1',
          contain: {
            circle: [
              {
                "x": 495,
                "y": 156,
                "width": 332,
                "height": 168,
                "id": "el0",
                "type": "circle",
                "value": "循环",
                "svgOptions": {
                  "firstBash": 108,
                  "currentY": 144
                },
                "contain": {},
                "hasCdn": true
              }
          ]
          }
        },
        {
          id: 'name2',
          name: 'name2',
          contain: {
            circle: [
              {
                "x": 495,
                "y": 156,
                "width": 332,
                "height": 168,
                "id": "el0",
                "type": "circle",
                "value": "循环",
                "svgOptions": {
                  "firstBash": 108,
                  "currentY": 144
                },
                contain: {},
                "hasCdn": true
              }
          ]
          }
        },
      ]
    }
  },
  mounted() {
    this.$http
      .get('/user/queryAdvice?id=12')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {

      })

    this.$data.list[0].contain.circle[0].contain = {
                  "condition": [
                    {
                        "x": 140,
                        "y": 7,
                        "width": 174,
                        "height": 34,
                        "id": "el3",
                        "type": "condition",
                        "value": [
                            [
                                "顺序代码执行完毕"
                            ],
                            [
                                "order"
                            ]
                        ],
                        "func": null
                    }
                  ],
                  "order": [],
                  "assist": [],
                  "noRefFunc": [],
                  "refFunc": [],
                  "circle": [],
                  "judge": [],
                  "doubleRef": [
                    {
                      "x": 24.2,
                      "y": 48,
                      "width": 248,
                      "height": 48,
                      "id": "el1",
                      "type": "doubleRef",
                      "value": [
                          [
                              "向前移动",
                              "速度",
                              "秒"
                          ],
                          [
                              10,
                              50
                          ]
                      ],
                      "func": "move_ahead"
                    },
                    {
                        "x": 24.2,
                        "y": 96,
                        "width": 248,
                        "height": 48,
                        "id": "el2",
                        "type": "doubleRef",
                        "value": [
                            [
                                "向左移动",
                                "速度",
                                "秒"
                            ],
                            [
                                10,
                                50
                            ]
                        ],
                        "func": "move_left"
                    }
                  ],
                  "longRefFunc": [],
                  "longRightRef": [],
                  "inOrder": []
                };
    this.$data.list[1].contain.circle[0].contain = {
                  "condition": [
                    {
                        "x": 140,
                        "y": 7,
                        "width": 174,
                        "height": 34,
                        "id": "el3",
                        "type": "condition",
                        "value": [
                            [
                                "顺序代码执行完毕"
                            ],
                            [
                                "order"
                            ]
                        ],
                        "func": null
                    }
                  ],
                  "order": [],
                  "assist": [],
                  "noRefFunc": [],
                  "refFunc": [],
                  "circle": [],
                  "judge": [],
                  "doubleRef": [
                    {
                      "x": 24.2,
                      "y": 48,
                      "width": 248,
                      "height": 48,
                      "id": "el1",
                      "type": "doubleRef",
                      "value": [
                          [
                              "向前移动",
                              "速度",
                              "秒"
                          ],
                          [
                              10,
                              50
                          ]
                      ],
                      "func": "move_ahead"
                    },
                    {
                        "x": 24.2,
                        "y": 96,
                        "width": 248,
                        "height": 48,
                        "id": "el2",
                        "type": "doubleRef",
                        "value": [
                            [
                                "向左移动",
                                "速度",
                                "秒"
                            ],
                            [
                                10,
                                50
                            ]
                        ],
                        "func": "move_left"
                    }
                  ],
                  "longRefFunc": [],
                  "longRightRef": [],
                  "inOrder": []
                };
    // let data = '"[{"x":479,"y":120,"width":272.20001220703125,"height":360,"id":"el0","type":"circle","value":"循环","svgOptions":{"firstBash":300,"currentY":336},"contain":{"condition":[],"order":[],"assist":[{"x":24.2,"y":192,"width":126,"height":48,"id":"el5","type":"assist","value":"合并机械臂","func":"close_arm"},{"x":24.2,"y":288,"width":126,"height":48,"id":"el7","type":"assist","value":"松开机械臂","func":"open_arm"}],"noRefFunc":[],"refFunc":[],"circle":[],"judge":[],"doubleRef":[{"x":24.2,"y":48,"width":248,"height":48,"id":"el1","type":"doubleRef","value":[["向前移动","速度","秒"],[2,3]],"func":"move_ahead"},{"x":24.2,"y":96,"width":248,"height":48,"id":"el2","type":"doubleRef","value":[["向后移动","速度","秒"],[4,6]],"func":"move_behind"}],"longRefFunc":[],"longRightRef":[{"x":24.2,"y":144,"width":248,"height":48,"id":"el4","type":"longRightRef","value":[["机械上臂向下摆动","度"],[3]],"func":"move_arm_high_down"},{"x":24.2,"y":240,"width":248,"height":48,"id":"el6","type":"longRightRef","value":[["机械上臂向上摆动","度"],[3]],"func":"move_arm_high_up"}],"inOrder":[]},"hasCdn":false}]"'
    // console.log(JSON.parse(data))
    this.$data.subToken = PubSub.subscribe('checkRecommand', this.recommandToMain);
  },
  methods: {
    recommandToMain(e, data) {
      if (data.confirm) {
        let $container = $('#container');
        let width = $container.width();
        this.$data.list.circle[0].x = width / 2;
        this.$data.list.circle[0].y = 50;
        let index = this.$data.eventTarget.getAttribute('index');
        this.$store.state.isCode = true;

        // 将推荐页面中的列表复制到编码模式中，从而实现编码过程
        cloneList(this.$data.list, this.$store.state.canvasList);

        setTimeout(() => {
          this.$store.state.isRenew = !this.$store.state.isRenew;
          setTimeout(() => {
            let target = $('#main-svg-container #' + this.$data.option.target + ' .out-line')[0];
            target.setAttribute('d', this.$data.option.nextD);
          }, 10);
        }, 0);
        return ;
      }
      if (data.cancel) {
        // 点击取消时候发生的事情
      }
      PubSub.unsubscribe(this.$data.subToken);
    },
    choiceRec(event) {
      if (event.target == event.currentTarget) {
        return ;
      }
      this.$store.state.showConfirm = true;
      this.$data.eventTarget = event.target;
      let name = event.target.getAttribute('data-name')
      this.$store.state.confirmMes = '系统不会保存您之前在编程页面所组件的命令块，是否要继续使用推荐方案:' + name + '？'
    }
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
    overflow-x: hidden!important;
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
.el-scrollbar__wrap, .container{
  overflow-x: hidden;
}
.el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(0,0,0,.3)!important;
  -webkit-transition: .3s background-color;
  transition: .3s background-color;
}
</style>
