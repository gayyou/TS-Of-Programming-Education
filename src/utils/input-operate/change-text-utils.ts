import { getTypeAndID } from '../shared/common-utils';
import { getTotalPosi } from '../shared/vlist-utils';
import { getTransform } from '../shared/svg-utils';

export function changeInput(this: any, event: any, payload: any) {
  if (this.model) {
    return;
  }
  event.stopPropagation();
  let { id, type } = getTypeAndID(this.$el),
      { x, y } = getTotalPosi(this.$el, this.$store.state.canvasList),
      { x: textX, y: textY } = getTransform(event.target),
      index = event.target.getAttribute('data-index');
  this.$store.state.isInput.id = id;
  this.$store.state.isInput.type = type;
  this.$store.state.isInput.index = parseInt(index);
  this.$store.state.isInput.value = this.value[1][parseInt(index)];
  
  let newX = x + textX - payload.x;
  let newY = y + textY - payload.y;
  $('.global-input')[0].style.display = 'block';
  $('.global-input')[0].style.left = newX + 'px';
  $('.global-input')[0].style.top = newY + 'px';
}

/**
 * @description 将全局input输入框隐藏起来
 * @field 在积木块点击事件中进行调用，（mixin中），在window点击中进行调用，在幕布点击中进行调用
 */
export function hideGlobalInput() {
  $('.global-input')[0].style.display = 'none';
}
