import { findList, findConCspList, getTotalPosi } from '../shared/vlist-utils';
import { adjustOperate, spiltOperate, nestOperate } from './drag';
import { setTransform } from '../shared/svg-utils';

/**
 * @description 更改积木块的位置函数
 * @param {Dom} target 鼠标移动的目标
 */
export function changeSvgPosi(this: any, target: any) {
  let conList = findList(target, this.$store.state.canvasList);
  
  // 分为最外层容器和不是最外层容器进行分别
  if (conList == this.$store.state.canvasList) {
    // renewList(conList, target);  // 单纯的更新列表
  } else {
    adjustOperate.call(this, target, $(target).parent()[0], conList);
    // setTimeout(() => {
    //   renewList(conList, target);
    // }, 0);
  }
}

/**
 * @description 对积木块的嵌套进行改变，可以是嵌套或者分离。本函数的编写前提是知道用户想要改变嵌套关系了，只需要进行填写函数
 * @param {Dom} target 鼠标移动的目标
 */
export function changeSvgNest(this: any, target: any, crashResult: any, event: any) {
  let conList = findList(target, this.$store.state.canvasList),
      toConList = null;
  if (!crashResult) {
    toConList = this.$store.state.canvasList;  // 没有发生碰撞的时候
  } else {
    toConList = findConCspList(crashResult.container, this.$store.state.canvasList);  // 寻找想要到的容器目标所在列表的contain属性
  }

  // remeberCdn.call(this, target, this.$store.state.canvasList);

  // 两种情况，一种是分裂，表现为分裂到根容器中，一种是嵌套，即从一个容器嵌套到另外一个容器或者从根目录嵌套
  if (toConList == this.$store.state.canvasList) {
    // 这个是分裂
    let mousePayload = {
          x: event.clientX,
          y: event.clientY
        },
        toTalObj = getTotalPosi(target, this.$store.state.canvasList);
    setTransform(target, toTalObj);  // 进行设置目标的位置，防止发生抖动
    spiltOperate.call(this, target, $(target).parent()[0], mousePayload);  // 进行更改分裂操作
  } else {
    let conTarget = $(target).parent()[0],
        fromList = findList(target, this.$store.state.canvasList);
    // 这个是嵌套
    nestOperate.call(this, target, crashResult);  // 进行嵌合操作
    // 接下来是改变原来容器的大小，进行调整并更新列表
    if (conTarget.getAttribute('id') !== 'main-svg-container') {
      setTimeout(() => {
        adjustOperate.call(this, target, conTarget, fromList);  // 进行调整原本容器的操作,当这个父容器是底层的话是不需要进行修改的
      })
    }
  }
}