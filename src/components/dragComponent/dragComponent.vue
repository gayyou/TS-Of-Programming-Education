<template>
  <div class="drag-container" id="container"
    @mousemove="dragMove"
    @mouseup="dragEnd"
  >
    <div class="renew" style="display:none" v-if="$store.state.isRenew"></div>

    <svg
      @click="dragStart"
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
      id="main-svg-container"
      
      inkscape:version="0.92.3 (2405546, 2018-03-11)"
      sodipodi:docname="绘图.svg">
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
        v-for="item in $store.state.canvasList.noRefFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></noRefFunc>
      <refFunc
        v-for="item in $store.state.canvasList.refFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></refFunc>
      <!-- <inOrder
        v-for="item in $store.state.canvasList.inOrder"
        :key="item.id"
        :containObject="item.contain"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
        :svgOptions="item.svgOptions"
      >
      </inOrder> -->
      <circles
        v-for="item in $store.state.canvasList.circle"
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
        v-for="item in $store.state.canvasList.judge"
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
        v-for="item in $store.state.canvasList.assist"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></assist>
      <condition
        v-for="item in $store.state.canvasList.condition"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></condition>
      <order
        v-for="item in $store.state.canvasList.order"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></order>
      <doubleRef
        v-for=" item in $store.state.canvasList.doubleRef"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></doubleRef>
      <longRefFunc
        v-for=" item in $store.state.canvasList.longRefFunc"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></longRefFunc>
      <longRightRef
        v-for=" item in $store.state.canvasList.longRightRef"
        :key="item.id"
        :y="item.y"
        :x="item.x"
        :id="item.id"
        :value="item.value"
        :model="false"
      ></longRightRef>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 1"
    >
      
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">功能</text>
      </g>
      <!-- <noRefFunc
        :model="true"
        :value="'向前移动'"
        :y="40"
      ></noRefFunc> -->
      <!-- <noRefFunc
        :model="true"
        :value="'向左转'"
        :y="40"
        :x="20"
      ></noRefFunc>
      <noRefFunc
        :model="true"
        :value="'向右转'"
        :y="110"
        :x="20"
      ></noRefFunc>
      <noRefFunc
        :model="true"
        :value="'向后转'"
        :y="180"
        :x="20"
      ></noRefFunc> -->
      <doubleRef
        :model="true"
        :value="[['向前移动', '速度', '秒'], [0, 0]]"
        :y="40"
        :x="20"
        :func="'move_ahead'"
      ></doubleRef>
      <doubleRef
        :model="true"
        :value="[['向后移动', '速度', '秒'], [0, 0]]"
        :y="110"
        :x="20"
        :func="'move_behind'"
      ></doubleRef>
      <doubleRef
        :model="true"
        :value="[['向左移动', '速度', '秒'], [0, 0]]"
        :y="180"
        :x="20"
        :func="'move_left'"
      ></doubleRef>
      <doubleRef
        :model="true"
        :value="[['向右移动', '速度', '秒'], [0, 0]]"
        :y="250"
        :x="20"
        :func="'move_right'"
      ></doubleRef>
      <longRefFunc
        :model="true"
        :value="[['将', '引脚置为高电平'], [0]]"
        :y="320"
        :x="20"
        :func="'set_height'"
      ></longRefFunc>
      <longRefFunc
        :model="true"
        :value="[['将', '引脚置为低电平'], [0]]"
        :y="390"
        :x="20"
        :func="'set_low'"
      ></longRefFunc>
      <!-- <order
        :model="true"
        :value="[['向前', '步'], [1]]"
        :y="250"
        :x="20"
      ></order>
      <order
        :model="true"
        :value="[['向后', '步'], [1]]"
        :y="320"
        :x="20"
      ></order>
      <order
        :model="true"
        :value="[['向左', '步'], [1]]"
        :y="390"
        :x="20"
      ></order> -->
      <!-- <order
        :model="true"
        :value="['向右', '步', 1]"
        :y="460"
        :x="20"
      ></order> -->
      <!-- <longRefFunc
        :model="true"
        :value="[['将', '引脚置为低电平'], [1]]"
        :y="460"
        :x="20"
      ></longRefFunc>
      <doubleRef
        :model="true"
        :value="[['向前移动', '速度', '秒'], [20, 30]]"
        :y="530"
        :x="20"
      ></doubleRef> -->
      <noRefFunc
        id="fake-noRefFunc"
        v-if="$store.state.model.type === 'noRefFunc'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></noRefFunc>
      <!-- <order
        id="fake-order"
        v-if="$store.state.model.type === 'order'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></order> -->
      <doubleRef
        id="fake-doubleRef"
        v-if="$store.state.model.type === 'doubleRef'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></doubleRef>
      <longRefFunc
        id="fake-longRefFunc"
        v-if="$store.state.model.type === 'longRefFunc'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></longRefFunc>

    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 2"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">逻辑</text>
      </g>
      <!-- <inOrder
        :model="true"
        :y="40"
        :x="20"
        :value="'循环'"
        :containObject="{}"
        :svgOptions="{
          firstBash: 36
        }"
      >   -->
      <!-- </inOrder> -->
      <circles
        :model="true"
        :y="40"
        :x="20"
        :value="'循环'"
        :containObject="{}"
        :svgOptions="{
          firstBash: 36
        }"
      ></circles>
      <judge
        :model="true"
        :y="160"
        :x="20"
        :value="'判断'"
        :containObject="{}"
        :svgOptions="{
          firstBash: 24,
          secondBash: -16,
          textBash: 100.3763
        }"
      ></judge>
      <circles
        id="fake-circle"
        v-if="$store.state.model.type === 'circle'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
        :svgOptions="{
          firstBash: 36
        }"
      ></circles>
      <judge
        id="fake-judge"
        v-if="$store.state.model.type === 'judge'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
        :svgOptions="{
          firstBash: 24,
          secondBash: -16,
          textBash: 100.3763
        }"
      ></judge>
      <inOrder
        id="fake-inOrder"
        :model="true"
        v-if="$store.state.model.type === 'inOrder'"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
        :value="'循环'"
        :containObject="{}"
        :svgOptions="{
          firstBash: 36
        }"
      >  
      </inOrder>

    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 3"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">判断</text>
      </g>
      <condition
        :model="true"
        :value="[['顺序代码执行完毕'], ['order']]"
        :y="40"
        :x="20"
      ></condition>
      <condition
        id="fake-condition"
        v-if="$store.state.model.type === 'condition'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></condition>


    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="3.66rem" height="100%" id="model-container"
      v-if="$store.state.leftStatus === 4"
    >
      <g transform="translate(12,0)" display="block" id="move-operate">
        <text class="operate-title" x="20" y="20" text-anchor="middle" dominant-baseline="central" dy="0">辅助</text>
      </g>
      <!-- <assist
        :model="true"
        :value="'抬起机械臂'"
        :y="40"
        :x="20"
      ></assist>
      <assist
        :model="true"
        :value="'放下机械臂'"
        :y="110"
        :x="20"
      ></assist> -->
      <assist
        :model="true"
        :value="[['合并机械臂'], []]"
        :y="40"
        :x="20"
        :func="'close_arm'"
      ></assist>
      <assist
        :model="true"
        :value="[['松开机械臂'], []]"
        :y="110"
        :x="20"
        :func="'open_arm'"
      ></assist>
      <order
        :model="true"
        :value="[['延时', '秒'], [0]]"
        :y="180"
        :x="20"
        :func="'delay_ms'"
      >
      </order>
      <longRightRef
        :model="true"
        :value="[['机械上臂向上摆动', '度'], [0]]"
        :y="250"
        :x="20"
        :func="'move_arm_high_up'"
      ></longRightRef>
      <longRightRef
        :model="true"
        :value="[['机械上臂向下摆动', '度'], [0]]"
        :y="320"
        :x="20"
        :func="'move_arm_high_down'"
      ></longRightRef>
      <longRightRef
        :model="true"
        :value="[['机械下臂向上摆动', '度'], [0]]"
        :y="390"
        :x="20"
        :func="'move_arm_low_up'"
      ></longRightRef>
      <longRightRef
        :model="true"
        :value="[['机械下臂向下摆动', '度'], [0]]"
        :y="460"
        :x="20"
        :func="'move_arm_low_down'"
      ></longRightRef>
      <longRightRef
        :model="true"
        :value="[['机械上臂向左转动', '度'], [0]]"
        :y="530"
        :x="20"
        :func="'move_arm_left'"
      ></longRightRef>
      <longRightRef
        :model="true"
        :value="[['机械上臂向右转动', '度'], [0]]"
        :y="600"
        :x="20"
        :func="'move_arm_right'"
      ></longRightRef>
      <assist
        id="fake-assist"
        v-if="$store.state.model.type === 'assist'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></assist>
      <longRightRef
        id="fake-longRightRef"
        v-if="$store.state.model.type === 'longRightRef'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      ></longRightRef>
      <order
        id="fake-order"
        v-if="$store.state.model.type === 'order'"
        :model="true"
        :value="$store.state.model.value"
        :y="$store.state.model.y"
        :x="$store.state.model.x"
      >
      </order>
    </svg>

    <div class="global-input">
      <input :value="$store.state.isInput.value" type="text" @input="inputs">
    </div>
  </div>
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
import Component from 'vue-class-component';
import { componentListMixin } from '@/utils/mixin/mixin';
import { hideGlobalInput } from '@/utils/input-operate/inputOperate';
import { isCrash } from '@/utils/svg-operate/crash-model';
import { findList, renewAllList, findItem } from '@/utils/shared/vlist-utils';
import { getTypeAndID } from '@/utils/shared/common-utils';
import { isSvgContainer } from '@/utils/shared/svg-utils';
import { changeSvgNest, changeSvgPosi } from '@/utils/svg-operate/move-end';
import { deleteOperate } from '@/utils/svg-operate/drag';
import $ from 'jquery'

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
export default class DragComponent extends Vue {
  mounted() {
    componentListMixin(this.$store.state.canvasList);
  }

  dragStart() {
    hideGlobalInput();
  }
  dragMove(event: any) {
    if (!this.$store.state.moveTarget) {
      return ;
    }
    let bashX = this.$store.state.bashX;
    let bashY = this.$store.state.bashY;
    // 算出偏移量为移动时候鼠标的偏移量减去点击时候鼠标的偏移量再加上之前
    let left = event.clientX - this.$store.state.mouse.x + bashX;
    let top = event.clientY - this.$store.state.mouse.y + bashY;
    let target = this.$store.state.moveTarget;
    let fakeTarget = this.$store.state.fakeTarget;
    let num = 'translate(' 
              + left
              + ','
              + top
              + ')';
    target.setAttribute('transform', num);
    if (fakeTarget) {
      fakeTarget.setAttribute('transform', num);
    }

    // 接下来要写的是在进行移动的时候，碰撞了，显示阴影
    let result = isCrash(target, this.$store.state.canvasList);
    let type = target.getAttribute('data-type');
    let toConList = null;
    if (result) {
      // toConList = findConCspList(result.container, this.$store.state.canvasList);
      // let { y: conY } = getTotalPosi(result.container, this.$store.state.canvasList);
      // let temp = {};
      // temp[type] = [{
      //   y: top - conY,
      //   x: 24
      // }]
      // toConList.contain.shadow = temp
      let underlineList = $('.underline');
      for (let i = 0; i < underlineList.length; i++) {
        underlineList[i].style.opacity = '0';
      }
      result.container.getElementsByClassName('underline')[0].style.opacity = 1;
      // setTimeout(() => {
      //   this.$store.state.isRenew = !this.$store.state.isRenew;
      // }, 0);
    } else {
      let underlineList = $('.underline');
      for (let i = 0; i < underlineList.length; i++) {
        underlineList[i].style.opacity = '0';
      }
    }
  }

  dragEnd(event: any) {
    let mousePayload = {
      x: event.clientX,
      y: event.clientY
    }
    if (this.$store.state.moveTarget) {
      let target = this.$store.state.moveTarget;

      let conList = findList(target, this.$store.state.canvasList),
          crashPayload = null,
          { id: conID } = getTypeAndID($(target).parent()[0]);

      if (conList != this.$store.state.canvasList) {
        crashPayload = this.$store.state.containInfo;  // 嵌入后拖出来的时候，这个containInfo的作用是记住拖出来的时候容器的大小宽度
      }

      let result = isCrash(target, this.$store.state.canvasList, crashPayload);
      console.log('碰撞结果', result)
      let toConList = null;

      if (result) {
        toConList = findList(result.container, this.$store.state.canvasList);
      } else {
        toConList = this.$store.state.canvasList;
      }
      // if (result)
      // console.log(result.container.getAttribute('id') != conID)
      if ((!this.$store.state.fakeTarget && !result && toConList == this.$store.state.canvasList && conList != this.$store.state.canvasList) 
          // 第一段是没有发生碰撞，并且目标容器是根容器，所在容器并不是根容器，而且不是在创建的时候，即就是在分裂的时候
          // 第二段的是碰撞有结果，并且碰撞对象并不是自己的容器，碰撞结果是一个容器积木块
          || (result && result.container.getAttribute('id') != conID && isSvgContainer(result.container))) {
        // 发生了碰撞并且碰撞对象并不是容器
        changeSvgNest.call(this, target, result, event);
      } else if (!result || (result.container.getAttribute('id') == conID && isSvgContainer(result.container))) {
        changeSvgPosi.call(this, target);
      }
      // if ((result && result.container.getAttribute('id') != conID && isSvgContainer(result.container)) || toConList != this.$store.state.canvasList) {
      //   // 发生碰撞时候 || 没有发生碰撞，移动的时候，将这个积木块拖到最外层的容器中
      //     changeSvgNest.call(this, target, result, event);
      // } else {
      //   // 没有发生碰撞的时候
      //     changeSvgPosi.call(this, target);
      // }
      

      this.$nextTick(() => {
        // 寻找并进行删除处于左侧的积木块
        renewAllList(this.$store.state.canvasList);
        deleteOperate(this.$store.state.canvasList);
        setTimeout(() => {
          this.$store.state.isRenew = !this.$store.state.isRenew;
        }, 0);
        let underlineList = $('.underline');
        for (let i = 0; i < underlineList.length; i++) {
          underlineList[i].style.opacity = '0';
        }
      })

      // 更新列表
      this.$store.state.containInfo.isUsed = true;
      this.$store.state.moveTarget = null;
    }
    if (this.$store.state.fakeTarget) {
      this.$store.state.fakeTarget.setAttribute('transform', 'translate(-500, -500)');
      this.$store.state.fakeTarget = null;
    }
  }

  inputs(event: any) {
    event.stopPropagation();
    let data = event.data;
    let pattern = new RegExp(/^[0-9]*$/);
    if (pattern.test(data) == false) {
      (<HTMLInputElement>$('.global-input input')[0]).value = (<HTMLInputElement>$('.global-input input')[0]).value.slice(0, (<HTMLInputElement>$('.global-input input')[0]).value.length - 1);  
      return ;
    }
    if ((<HTMLInputElement>$('.global-input input')[0]).value.length > 2) {
      (<HTMLInputElement>$('.global-input input')[0]).value = (<HTMLInputElement>$('.global-input input')[0]).value.slice(0, 2);  
      console.log(this.$store.state.isInput.value)
    }
    let type = this.$store.state.isInput.type;
    let id = this.$store.state.isInput.id;
    let index = this.$store.state.isInput.index;
    // let list = this.$store.state.canvasList;
    console.log($('#' + id)[0])
    let target = $('#' + id)[0];
    let item = findItem(target, this.$store.state.canvasList);
    console.log(item);
    // let newArr = [];
    item.value[1][index] = parseInt((<HTMLInputElement>$('.global-input input')[0]).value);
    // item.value[1].push('');
    // item.value[1].pop();
    // this.$store.state.isRenew = !this.$store.state.isRenew
    // for (let i = 0; i < list[type].length; i++) {
    //   if (id == list[type][i].id) {
    //     list[type][i].value[index] = $('.global-input input')[0].value;
    //   }
    // }
    (<any>target.getElementsByClassName('text')[index].firstChild).nodeValue = (<HTMLInputElement>$('.global-input input')[0]).value;
  }
}
</script>

<style lang="scss" scoped>
.global-input {
  position: absolute;
  display: none;
  z-index: 111;
  width: 0.4rem;
  height: 0.26rem;

  input {
    font-family: 'MicrosoftYaHei'!important;
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 12px;
    font-size: 16px;
  }
}
.drag-container {
  position: relative;
  width: 1000px;
  height: 1000px;
  border: 1px solid rgba($color: #000000, $alpha: .3);
  .drag-div {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: red;
  }
}
#main-svg-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: #fff;
}
#model-container {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 11;
  background-color: #F5F1EF;

  .operate-title {
    // font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 0.18rem;
    fill: #9E9898;
    font-weight: bold;
  }
}
</style>
