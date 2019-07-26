import { VItem } from '../interface/VItem';
import { getAllChildren } from '../shared/vlist-utils';
import { insertSort } from '../shared/common-utils';

export function formatData(targetItem: VItem) {
  return codeItem(targetItem, 0);
}

function codeItem(item: VItem, nestLevel: number) {
  let argsStr = '',
      type = item.type,
      condition = null;

  if (item.value[1]) {
    for (let i = 0; i < item.value[1].length; i++) {
      argsStr += item.value[1][i];
      if (i < item.value[1].length - 1) {
        argsStr += ','
      }
    }
  }

  switch(type) {
    case 'judge': {
      type = 'if'
      if (item.contain.condition.length == 1) {
        condition = item.contain.condition[0].value[1][0]
      }
      break;
    }

    case 'circle': {
      type = 'while'
      if (item.contain.condition.length == 1) {
        condition = item.contain.condition[0].value[1][0]
      }
      break;
    }

    default: {
      type = ''
    }
  }

  return {
    type: type,
    tab: nestLevel,
    ops: item.func ? item.func + '(' + argsStr + ')' : null,
    condition: condition,
    children: item.contain ? getSentence(item, nestLevel) : []
  }
}

function getSentence(item: VItem, tabLevel: number) {
  let { type } = item,
      resultData = [];
      switch(type) {
        case 'judge': {
          resultData = getJudgeStn(item, tabLevel);
          break;
        }
        
        case 'circle': {
          resultData = getWhileStn(item, tabLevel);
          break;
        }
    
        default: {

        }
      }

  return resultData;
}

/**
 * 
 * @param {*} item Judge的item
 * @param {*} tabLevel 
 * @param {Array} ifResult 这个是最终要返回的数组，因为调用这个是调用找到
 */
function getJudgeStn(item: VItem, tabLevel: number): any {
  let cutLineY = item.svgOptions.textBash,
      { contain } = item,
      childList: Array<any> = getAllChildren(contain),
      elseObj: any = null, ifChildArr = [];

  insertSort(childList);  // 排序

  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    // 这里的思路是先根据它的textbash判断哪些执行语句是在if还是else，然后在这里先用for循环将一层拿出来，如果有二层的，就要调用codeList
    if (childList[i].y <= cutLineY) {
      // 将if语句拿出来
      ifChildArr.push(codeItem(childList[i], tabLevel + 1));   // 层级 + 1
    } else {
      // 将else执行语句拿出来
      if (elseObj == null) {
        elseObj = {
          type: 'else',
          tab: tabLevel,
          ops: null,
          condition: null,
          children: []
        }
      }
      elseObj.children.push(codeItem(childList[i], tabLevel + 1));
    }
  }

  if (ifChildArr.length && elseObj) {
    ifChildArr.push(elseObj);
  }
  
  return ifChildArr;
}

function getWhileStn(item: VItem, tabLevel: number): any {
  let { contain } = item,
      childList = getAllChildren(contain),
      data = [];

  insertSort(childList);
  for (let i = 0; i < childList.length; i++) {
    if (childList[i].type == 'condition') {
      continue;
    }
    data.push(codeItem(childList[i], tabLevel + 1));
  }

  return data;
}