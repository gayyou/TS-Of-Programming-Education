import { isSvgContainer, getSvgWH, getTransform } from '../shared/svg-utils';
import { findList, listPush } from '../shared/vlist-utils';
import { getTypeAndID } from '../shared/common-utils';
import { renewJudgeOption, renewWhileOption } from '../svg-operate/options';
import { VItem } from '../interface/VItem';
import { hideGlobalInput } from '../input-operate/inputOperate';
import { choiceUpdate } from '../update';
import { svgComponentOption } from '../models/model';
import { VList } from '../interface/VList';

/**
 * @description 混入模式，将这个可移动的组件添加一个点击事件,点击将全局的拖拽对象moveTarget赋值为这个组件
 * @param {vueComponent} this 组件的对象，即这个组件内部的上下文对象
 */
export function eventMixin(this: any) {
  this.$el.onmousedown = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    this.$store.state.moveTarget = this.$el;
    if (isSvgContainer(this.$el)) {
      // 容器在点击的时候，会默认选择该容器去作为上传代码的容器
      this.$store.state.choiceTarget = this.$el;
    }
    initContainInfo.call(this);
    setMouseDownInit.call(this, event);
    choiceUpdate.call(this, this.$el);
    // 隐藏输入框
    hideGlobalInput();
  }
}

/**
 * @version 1.0.0
 * @description 得到父容器的宽高
 */
function initContainInfo(this: any) {
  let target = this.$el;
  let resultList = findList(target, this.$store.state.canvasList);
  if (resultList !== this.$store.state.canvasList) {
    this.$store.state.containInfo.width = getSvgWH($(target).parent()[0]).width;
    this.$store.state.containInfo.height = getSvgWH($(target).parent()[0]).height;
    this.$store.state.containInfo.x = getTransform($(target).parent()[0]).x;
    this.$store.state.containInfo.y = getTransform($(target).parent()[0]).y;
    this.$store.state.containInfo.id = $(target).parent()[0].getAttribute('id');
    this.$store.state.containInfo.isUsed = false;
  }
}

/**
 * @description 初始化的时候，将这个对象进行存入到列表中.
 * @param {DOM} el 组件的
 */
export function initMixin() {
  // // // // console.log(this)
}

export function createModelMixin(this: any) {
  let target = this.$el;
  
  target.onmousedown = (event: any) => {
    // 获取信息
    let target = this.$el,
        list = this.$store.state.canvasList,
        { type } = getTypeAndID(target),
        { width, height } = getSvgWH(target),
        { x: targetX, y: targetY } = getTransform(target);

    event.preventDefault();
    // 根据点击的对象，将点击的对象的所有属性都放在$store的model属性中，然后在fake层新添一个svg进行拖拽
    this.$store.state.model.value = this.value;
    this.$store.state.model.y = targetY;
    this.$store.state.model.x = targetX;
    this.$store.state.model.type = type;
    // this.$store.state.elCount++;

    let ID = 'el' + this.$store.state.elCount++;   // 这里只是进行引用id，实际上还没有进行生成组件，只是提前用了，真正生成组件的是调用listPush方法，并且在上面的initMixin方法里面生成并赋值

    // 新节点
    let newItem: VItem = {
      x: targetX,
      y: targetY,
      width: width,
      height: height,
      id: ID,
      type,
      value: this.value
    };
    
    switch(type) {
      case 'judge': {
        newItem.svgOptions = Object.assign({}, renewJudgeOption);
        break;
      }
      case 'circle': {
        newItem.svgOptions = Object.assign({}, renewWhileOption);
        break;
      }
      case 'inOrder': {
        newItem.svgOptions = Object.assign({}, renewWhileOption);
        break;
      }
      default: {
        if (this.func) {
          newItem.func = this.func;
        } else {
          newItem.func = null;
        }
      }
    }

    // 列表的插入 操作
    listPush.bind(this)(list, type, newItem);

    setTimeout(() => {
      console.log(type);
      let fakeTarget = $('#fake-' + type)[0];
      console.log('fake',fakeTarget)
      let targetList = $('#main-svg-container>.' + type);
      console.log(targetList[0])

      // 设置鼠标初始化
      setMouseDownInit.call(this, event);
      this.$store.state.fakeTarget = fakeTarget;
      this.$store.state.moveTarget = targetList[targetList.length - 1];
    }, 0);
  }
}

function setMouseDownInit(this: any, event: any) {
  this.$store.state.mouse.x = event.clientX;
  this.$store.state.mouse.y = event.clientY;
  setTimeout(() => {
    // 点击时候赋值，这是本次循环中进行赋值，但是这个store真正有赋值到的是下个事件循环的时候才能拿到。
    // 在每个元素都会混入让movetarget指向一个块，但是这个变量是在本次事件循环赋值，并不知道快慢，所以只有等到下个事件循环的时候才进行判断
    // 所以需要用setTimeout等到下个事件循环的时候进行查询
    if (!this.$store.state.moveTarget) {
      return ;
    }
    let transform = getTransform(this.$store.state.moveTarget);
    this.$store.state.bashX = transform.x;
    this.$store.state.bashY = transform.y;
  }, 0);
}

/**
 * @description 队列表进行插入属性
 * @param {*} conObj 容器的contain属性或者根目录，即VList
 */
export function componentListMixin(conObj: VList) {
  svgComponentOption.forEach((value) => {
    conObj[value] = [];
  });
}