import { VList } from '../interface/VList';
import { getTypeAndID, insertSort } from '../shared/common-utils';
import { getTotalPosi, cloneSvgInfo, cloneList, findItem } from '../shared/vlist-utils';
import { isSvgContainer, getSvgWH, getTransform } from '../shared/svg-utils';
import { VItem } from '../interface/VItem';
import { judgeOption, whileOption } from './options';

/**
 * @author Weybn
 * @version 1.0.0
 * @description 将目标节点的信息数据进行转移，用处在嵌套或者分离的时候进行使用。
 * @param {Dom} target 目标节点
 * @param {Dom} crashTarget 容器节点
 * @param {List} fromList 目标节点所在列表
 * @param {List} toList 容器节点所在列表，也可以是最外层的容器
 */
export function toContainer(this: any, target: any, crashTarget: any, fromList: VList, toList: any) {
  let { type, id } = getTypeAndID(target),
      { id: conID } = getTypeAndID(crashTarget),
      bashY = getTotalPosi(crashTarget, this.$store.state.canvasList),
      targetY = getTotalPosi(target, this.$store.state.canvasList),
      newY = targetY.y - bashY.y,
      move: any = null;

  for (let i = 0; i < fromList[type].length; i++) {
    if (fromList[type][i].id == id) {
      if (isSvgContainer(target)) {
        // 移动的目标为容器，则要进行深复制挪过去
        move = {};
        cloneSvgInfo(move, fromList[type][i])  // 复制信息
        cloneList(fromList[type][i].contain, move.contain);  // 复制内容
        fromList[type].splice(i, 1);
      } else {
        // 如果移动目标并不是容器
        move = fromList[type][i];
        fromList[type].splice(i, 1);
      }

      if (toList == this.$store.state.canvasList) {
        // 移动到最外层
        this.$store.state.canvasList[type].push(move);
      } else {
        for (let j = 0; j < toList.length; j++) {
          if (conID == toList[j].id) {
            if (type == 'condition') {

              if (toList[j].contain.condition.length == 1) {
                echangePosi.call(this, toList[j].contain.condition[0]);
                toList[j].contain.condition.pop();
              }
            } else {
              move.y = newY;
            }
            toList[j].contain[type].push(move);
          }
        }
      }
    }
  }

  // 更新视图层，防止数组增加后并没有渲染
  this.$store.state.isRenew = !this.$store.state.isRenew;
}

function echangePosi(this: any, item: VItem) {
  let { x, y } = getTotalPosi($('#' + item.id)[0], this.$store.state.canvasList);
  item.x = x + 240;
  item.y = y;
  this.$store.state.canvasList.condition.push(item);
}


/**
 * @description 调整conTarget里面块的顺序和位置
 * @param {*} target 正在拖拽的目标
 * @param {*} conList 拖拽目标所在容器列表
 * @param {Dom} conTarget 拖拽目标的容器
 * @param {Object} options svg更改的配置
 */
export function adjustSvgPosi(this: any, target: any, conList: VList, options: any, conTarget: any) {
  let childList = [],
      { type, id } = getTypeAndID(target), 
      { type: conType } = getTypeAndID(conTarget),
      keys = Object.keys(conList);

  let conItem = findItem(conTarget, this.$store.state.canvasList);

  if (conItem.contain.condition.length == 1) {
    conItem.hasCdn = true;
  } else {
    conItem.hasCdn = false;
  }
  
  // 获得所有子节点
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == 'shadow') {
      if (conList[keys[i]] == null) {
        continue;
      }
      let shadowKey = Object.keys(conList[keys[i]])[0];
      // if (conList[keys[i]]) {
      //   let shadow = $('#' + shadowKey + 'Sha')[0];
      //   let { height, width } = getSvgWH(shadow);
      //   childList.push({
      //     y: conList[keys[i]][].y,
      //     height,
      //     width,
      //     x: 24
      //   })
      // }
      continue;
    }
    for (let j = 0; j < conList[keys[i]].length; j++) {
      if (conList[keys[i]][j].id == id && conList[keys[i]][j].type != 'condition') {
        // 正在移动的目标还没有进行更新视图层，所以要获得当前相对于容器的位置
        let { y } = getTransform(target);
            
        conList[keys[i]][j].y = y;
      }
      childList.push(conList[keys[i]][j]);
    }
  }

  insertSort(childList); // 排序

  if (conType == 'judge') {
    adjustJudge.call(this, childList, conTarget, options)
  } else {
    // 对circle的调整
    adjustWhile.call(this, childList, conTarget, options);
  }
}

/**
 * @author Weybn
 * @time 2019-09-05
 * @description 调整推荐页面列表中的svg块的顺序及位置
 * @param {VList} list svg存放的List
 */
export function adjustRecommandSvgOperate(list: any) {
  debugger
  preResolve(list);
  for (let item in list) {
    if (isSvgContainer(item)) {
      for (let i = 0; i < list[item].length; i++) {
        adjustRecommandSvgOperate(list[item][i].contain);
      }
      recommandSvgAdjust(item);
    }
  }
}

function preResolve(list: VList) {
  for (let item in list) {
    for (let i = 0; i < list[item].length; i++) {
      let element = list[item][i];
      element.height = getSvgWH($('#' + element.id)[0]).height;
      if (isSvgContainer(element.type)) {
        preResolve(element.contain);
      }
    }
  }
}

function recommandSvgAdjust(conItem: any) {
  let childList = [],
      list = conItem.contain,
      conType = conItem.type;
  
  let keys = Object.keys(list);
  // 获得所有子节点
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < list[keys[i]].length; j++) {
      childList.push(list[keys[i]][j]);
    }
  }

  insertSort(childList); // 排序

  switch(conType) {
    case 'judge': {
      recAdjustJudge(conItem, childList);
      break;
    }

    case 'circle': {
      recAdjustWhile(conItem, childList);
      break;
    }
  }
}

function recAdjustJudge(conItem: any, childList: Array<any>) {
  let options = judgeOption,
      bashX = options.bashX,
      bash1Y = options.bashY,
      bash2Y = options.bashSecondY - 24,
      bashTextY = options.elseText.bash,
      firstBash = options.firstBash,
      secondBash = options.secondBash,
      secFlag = false,
      firstFlag = false,
      ifElseLine = conItem.svgOptions.textBash,
      item = conItem;

  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    childList[i].x = bashX;

    if (childList[i].y < ifElseLine) {
      firstFlag = true;
      childList[i].y = bash1Y;
      bash2Y += childList[i].height;
      bash1Y += childList[i].height;
      bashTextY += childList[i].height;
      firstBash += childList[i].height;
    } else {
      secFlag = true;
      childList[i].y = bash2Y;
      bash2Y += childList[i].height;
      secondBash -= childList[i].height;
      firstBash += childList[i].height;
    }
  }

  firstBash -= 24;
  bashTextY -= 23.5;

  if (!firstFlag) {
    firstBash += options.firstBash;
    bashTextY = options.elseText.bash;

    for (let i = 0; i < childList.length; i++) {
      if (childList[i].type == 'condition') {
        continue;
      }
      childList[i].y += options.firstBash + 0.5;
    }
  }

  if (secFlag) {
    // secondBash += 23.5;
    secondBash += 23.5;
    firstBash -= 23.5;
  } else {
    
  }
  
  item.svgOptions.firstBash = firstBash;
  item.svgOptions.secondBash = secondBash;
  item.svgOptions.textBash = bashTextY;
}

function recAdjustWhile(item: any, childList: Array<any>) {
  let options = whileOption,
      bashX = options.bashX,
      bashY = options.bashY,
      currentBash = 24;

  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    // 重新更新
    childList[i].x = bashX;
    childList[i].y = bashY;

    bashY += childList[i].height;

    if (currentBash <= options.firstBash + 12) {
      // 第一次的时候，因为会有空隙，所以while循环块的扩大会比目标的height还要大出12
      currentBash = childList[i].height + 12;  // 这个12是通过试验得出的。
    } else {
      // 第二次及以后，则直接加上increationY这么大
      
      currentBash = childList[i].height + currentBash;
    }
  }

  if (currentBash == 24) {
    currentBash += 12;
  }

  item.svgOptions = {
    firstBash: currentBash,
    currentY: bashY
  }
}

function adjustWhile(this: any, childList: Array<VItem>, conTarget: any, options: any) {
  let bashX = options.bashX,
      bashY = options.bashY,
      currentBash = 24,
      nextBash = 0,
      item = findItem(conTarget, this.$store.state.canvasList);

  
  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    // 重新更新
    childList[i].x = bashX;
    childList[i].y = bashY;

    bashY += childList[i].height;

    if (currentBash <= options.firstBash + 12) {
      // 第一次的时候，因为会有空隙，所以while循环块的扩大会比目标的height还要大出12
      currentBash = childList[i].height + 12;  // 这个12是通过试验得出的。
    } else {
      // 第二次及以后，则直接加上increationY这么大
      
      currentBash = childList[i].height + currentBash;
    }
  }

  if (currentBash == 24) {
    currentBash += 12;
  }

  item.svgOptions = {
    firstBash: currentBash,
    currentY: bashY
  }
  

  // 在视图层改变之前先更新一波
  for (let i = 0; i < childList.length; i++) {
    $('#' + childList[i].id).attr('transform', 'translate(' + childList[i].x + ','+ childList[i].y +')');
  }
}

function adjustJudge(this: any, childList: Array<VItem>, conTarget: any, options: any) {
  let bashX = options.bashX,
      bash1Y = options.bashY,
      bash2Y = options.bashSecondY - 24,
      bashTextY = options.elseText.bash,
      firstBash = options.firstBash,
      secondBash = options.secondBash,
      secFlag = false,
      firstFlag = false,
      ifElseLine = conTarget.getElementsByClassName('else')[0].getAttribute('transform'),
      item = findItem(conTarget, this.$store.state.canvasList);
      ifElseLine = item.svgOptions.textBash;

  
  // ifElseLine = parseInt(ifElseLine.split(' ')[5]);

  // let textBash = parseInt(conTarget.getAttribute('data-textBash'));
  
  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    childList[i].x = bashX;

    if (childList[i].y < ifElseLine) {
      firstFlag = true;
      childList[i].y = bash1Y;
      bash2Y += childList[i].height;
      bash1Y += childList[i].height;
      bashTextY += childList[i].height;
      firstBash += childList[i].height;
    } else {
      secFlag = true;
      childList[i].y = bash2Y;
      bash2Y += childList[i].height;
      secondBash -= childList[i].height;
      firstBash += childList[i].height;
    }
  }

  firstBash -= 24;
  bashTextY -= 23.5;

  if (!firstFlag) {
    firstBash += options.firstBash;
    bashTextY = options.elseText.bash;

    for (let i = 0; i < childList.length; i++) {
      if (childList[i].type == 'condition') {
        continue;
      }
      childList[i].y += options.firstBash + 0.5;
    }
  }

  if (secFlag) {
    // secondBash += 23.5;
    secondBash += 23.5;
    firstBash -= 23.5;
  } else {
    
  }
  
  item.svgOptions.firstBash = firstBash;
  item.svgOptions.secondBash = secondBash;
  item.svgOptions.textBash = bashTextY;
  for (let i = 0; i < childList.length; i++) {
    $('#' + childList[i].id).attr('transform', 'translate(' + childList[i].x + ','+ childList[i].y +')');
  }
}
