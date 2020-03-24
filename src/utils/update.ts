import { isSvgContainer } from './shared/svg-utils';
import { VList } from './interface/VList';
import { getTypeAndID } from './shared/common-utils';
import { findItem, findList } from './shared/vlist-utils';

/**
 * @description 上传时候的处理，先处理视图，再处理choiceTarget
 * @param {} target
 */
export function choiceUpdate(this: any, target: any) {
  // 循环拿到接近于画板的容器对象
  while ($(target).parent()[0].getAttribute('id') !== 'main-svg-container') {
    target = $(target).parent()[0];
  }

  if (!isSvgContainer(target)) {
    return ;
  }
  if (this.$store.state.choiceTarget != null) {
    let rootList = this.$store.state.canvasList;
    for (let i = 0; i < rootList.circle.length; i++) {
     (<any>$('#' + rootList.circle[i].id)[0].getElementsByClassName('choice-path')[0]).style.stroke = 'rgba(0, 0, 0, .3)';
     (<any>$('#' + rootList.circle[i].id)[0].getElementsByClassName('choice-path')[1]).style.stroke = 'rgba(0, 0, 0, .3)';
    }
    for (let i = 0; i < rootList.judge.length; i++) {
      (<any>$('#' + rootList.judge[i].id)[0].getElementsByClassName('choice-path')[0]).style.stroke = 'rgba(0, 0, 0, .3)';
      (<any>$('#' + rootList.judge[i].id)[0].getElementsByClassName('choice-path')[1]).style.stroke = 'rgba(0, 0, 0, .3)';
    }

  }
  target.getElementsByClassName('choice-path')[0].style.stroke = 'yellow';
  target.getElementsByClassName('choice-path')[1].style.stroke = 'yellow';
  this.$store.state.choiceTarget = target;
}

export function remeberCdn(this: any, target: any, rootList: VList) {
  let { id, type } = getTypeAndID(target);
  if (type != 'condition') {
    return ;
  }
  let item = findItem(target, rootList),
      list = findList(target, rootList);

  let temp = JSON.parse(JSON.stringify(item));
  this.$store.state.cdnInfo = {
    contain: list,
    info: temp
  }
}
