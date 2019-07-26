import { judgeOption, whileOption } from './options';
import { VList } from '../interface/VList';
import { findItem, findList } from '../shared/vlist-utils';
import { getTypeAndID } from '../shared/common-utils';
import { getSvgWH, getTransform } from '../shared/svg-utils';

/**
 * @description 将执行代码块嵌入到循环中。思路是将块先放进目标容器中，然后偏移量transform重新进行设置，
 * 这个设置是通过一次次试验得到的数据，所以光看逻辑并不会看出来，需要引入options文件。
 * @version 1.1.0 去掉isFake参数，并且去掉toContainer
 * @param {g tag} target 想要内嵌的目标
 * @param {*} conTarget 容器
 * @variation currentY: 嵌入到当前容器中块的基础transform的y值。 
 * @variation currentBash: path的某个数值，这个数值改变这个svg块的长度
 */
export function nestWhileOperate(this: any, target: any, conTarget: any, list: VList) {
  // 先将节点插入到碰撞的块中
  let { id, type } = getTypeAndID(target),
      { type: conType, id: conID } = getTypeAndID(conTarget);

  if (type == 'condition') {
    return nestConditionOperate.bind(this)(target, conTarget, list);
  }
  
  // 先得到之前的循环框的内嵌块的起点currentY和path中的延伸长度起点
  let nextY, nextBash,
      targetInfo = target.getBBox(),
      height = targetInfo.height;

  // 寻找容器的item，这里后期可以优化，不要从根目录找起
  let item = findItem(conTarget, this.$store.state.canvasList),
      { firstBash, currentY } = item.svgOptions,
      currentBash = firstBash;

  // 这里将嵌入块重新设置坐标，因为坐标是相对坐标，相对于容器坐标
  for (let i = 0; i < list[type].length; i++) {
    if (list[type][i].id == id) {
      list[type][i].x = whileOption.bashX;
      list[type][i].y = currentY;
    }
  }
  
  // 因为svg图的改变，要改变d中的某个数值，这个数值就是nextBash！
  if (currentBash <= whileOption.firstBash + 12) {
    // 第一次的时候，因为会有空隙，所以while循环块的扩大会比目标的height还要大出12
    nextBash = height + whileOption.pathBash;  // 这个12是通过试验得出的。
  } else {
    // 第二次及以后，则直接加上increationY这么大
    nextBash = height + currentBash;
  }

  nextY = currentY + height;  // 下个内嵌进来的元素的transform的基础值！

  item.svgOptions = {
    firstBash: nextBash,
    currentY: nextY
  }
}

/**
 * @description 嵌套判断语句时候的函数
 * @version 1.1.0 去掉isFake参数，并且去掉toContainer
 * @param {*} target 
 * @param {*} conTarget 
 * @param {*} list 
 * @param {*} isIf 
 */
export function nestJudgeOperate(this: any, target: any, conTarget: any, list: VList, isIf: boolean) {
  let { id, type } = getTypeAndID(target),
      { id: conID, type: conType } = getTypeAndID(conTarget);
  
  // 首先将元素内嵌
  // toContainer(target, conTarget);

  if (type == 'condition') {
    return nestConditionOperate.bind(this)(target, conTarget, list);
  }

  // 获得之前的所有数据
  let { height } = getSvgWH(target),
      nextY, nextFirstBash, nextSecondBash, nextTextBash;

  let item = findItem(conTarget, this.$store.state.canvasList),
      { firstBash, secondBash, textBash, firstTime, currentY, currentSecondY } = item.svgOptions;

  if (isIf) {
    let nextSecondY;
    if (firstTime == 1) {
      // 在if中第一次插入的时候
      nextFirstBash = height + firstBash - 24;
      nextTextBash = textBash + height - 24; // 这个减24也是通过试验得出的 
      nextSecondY = height + currentSecondY - 24;  
    } else {
      // 在if语句中不是第一次插入的时候
      nextFirstBash = height + firstBash;
      nextTextBash = height + textBash;
      nextSecondY = height + currentSecondY;  // 要更改第二个的初始位置
    }
    
    firstTime = parseInt(firstTime) + 1;

    for (let i = 0; i < list[type].length; i++) {
      if (list[type][i].id == id) {
        list[type][i].x = judgeOption.bashX;
        list[type][i].y = currentY;
      }
    }

    nextY = currentY + height;
  } else {
    if (secondBash == judgeOption.secondBash) {
      nextSecondBash = secondBash - height + 23.5;
      nextFirstBash = height + firstBash - 23.5;
    } else {
      nextSecondBash = secondBash - height;
      nextFirstBash = height + firstBash;
    }

    let nextD = judgeOption.firstHalf 
              + nextFirstBash 
              + judgeOption.secondHalf
              + nextSecondBash    // 这里需要加之前的第二个基础，因为在if中插入的时候并不会影响第二个
              + judgeOption.lastHalf;

    for (let i = 0; i < list[type].length; i++) {
      if (list[type][i].id == id) {
        list[type][i].x = judgeOption.bashX;
        list[type][i].y = currentSecondY;
      }
    }

    // conTarget.getElementsByClassName('out-line')[0].setAttribute('d', nextD); // 赋值path值

    // 下面是设置
    nextY = currentSecondY + height;
  }
}

/**
 * @description 条件嵌入容器
 * @version 1.1.0 去掉isFake参数，并且去掉toContainer
 * @param {Dom} target 拖拽的目标
 * @param {Dom} conTarget 要嵌入的容器
 * @param {List} list 拖拽目标的列表
 */
function nestConditionOperate(this: any, target: any, conTarget: any, list: VList) {
  let { id, type } = getTypeAndID(target),
      { id: conID, type: conType } = getTypeAndID(conTarget);

  for (let i = 0; i < list[type].length; i++) {
    if (list[type][i].id == id) {
      switch(conType) {
        case 'circle': {
          list[type][i].x = 140;
          break;
        }

        case 'judge': {
          list[type][i].x = 80;
          break;
        }
      }
      
      list[type][i].y = 7.5;
    }
  }

  for (let i = 0; i < list[conType].length; i++) {
    if (list[conType][i].id == conID) {
      list[conType][i].hasCdn = true;
      break;
    }
  }
}

/**
 * @description 进行分离条件的操作
 * @param {*} conTarget 容器dom
 * @param {*} list 列表
 */
export function splitConditionOperae(this: any, conTarget: any) {
  let { id: conID, type: conType } = getTypeAndID(conTarget),
      list = findList(conTarget, this.$store.state.canvasList);

  for (let i = 0; i < list[conType].length; i++) {
    if (list[conType][i].id == conID) {
      list[conType][i].hasCdn = false;
      break;
    }
  }
}

/**
 * @description 循环语句分离函数
 * @param {Dom} target 
 * @param {Dom} conTarget
 * @version 1.1.0 将其更加抽象化
 */
export function splitWhileOperate(this: any, target: any, conTarget: any) {
  let { height: targetHeight } = getSvgWH(target),
      nextY, nextBash,
      { type } = getTypeAndID(target);

  if (type == 'condition') {
    return splitConditionOperae.call(this, conTarget);
  }

  let item = findItem(conTarget, this.$store.state.canvasList),
      { firstBash, currentY } = item.svgOptions.firstBash,
      currentBash = firstBash;

  nextBash = currentBash - targetHeight;

  if (nextBash <= whileOption.pathBash + 24) {
    nextBash = whileOption.pathBash + 24;
  }

  nextY = currentY - targetHeight;

  item.svgOptions = {
    firstBash: nextBash,
    currentY: nextY
  };
}

/**
 * 
 * @param {Dom} target 
 * @param {Dom} conTarget 
 */
export function splitJudgeOperate(this: any, target: any, conTarget: any, list: VList) {
  let { id, type } = getTypeAndID(target),
      { id: conID, type: conType } = getTypeAndID(conTarget),
      { y } = getTransform(target);

  if (type == 'condition') {
    return splitConditionOperae.call(this, conTarget);
  }

  let { height } = getSvgWH(target),
      nextY, nextFirstBash, nextSecondBash, nextTextBash, isIf;

  let item = findItem(conTarget, this.$store.state.canvasList),
      { firstBash, secondBash, textBash, currentY, currentSecondY, firstTime } = item.svgOptions;

  let ifElseLine = conTarget.getElementsByClassName('else')[0].getAttribute('transform');
  ifElseLine = parseInt(ifElseLine.split(' ')[5]);

  if (y < ifElseLine) {
    isIf = true;
  } else {
    isIf = false;
  }

  if (isIf) {
    let nextSecondY;
    firstTime = parseInt(firstTime) - 1;

    if (firstTime == 1) {
      // 在if中第一次插入的时候
      nextFirstBash = height + firstBash - 24;
      nextTextBash = textBash + height - 24; // 这个减24也是通过试验得出的 
      nextSecondY = height + currentSecondY - 24;  
    } else {
      // 在if语句中不是第一次插入的时候
      nextFirstBash = firstBash - height;
      nextTextBash = textBash - height;
      nextSecondY = currentSecondY - height;  // 要更改第二个的初始位置
    }

    nextY = currentY + height;

    item.svgOptions = {
      firstBash: nextFirstBash,
      secondBash: secondBash,
      textBash: nextTextBash,
      firstTime,
      currentY: nextY,
      currentSecondY: nextSecondY
    }
  } else {
    if (secondBash == judgeOption.secondBash) {
      nextSecondBash = secondBash - height + 23.5;
      nextFirstBash = height + firstBash - 23.5;
    } else {
      nextSecondBash = secondBash + height;
      nextFirstBash = height - firstBash;
    }

    // 下面是设置
    nextY = currentSecondY + height;

    item.svgOptions = {
      firstBash: nextFirstBash,
      secondBash: nextSecondBash,
      textBash,
      currentY,
      currentSecondY: nextY,
      firstTime
    }
  }
}