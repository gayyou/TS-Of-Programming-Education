import { VList } from '../interface/VList';
import { VItem, ConItem } from '../interface/VItem';
import { getTransform, isSvgContainer } from './svg-utils';
import { isUndef, getTypeAndID } from './common-utils';
import { svgComponentOption } from '../models/model';

export function getAllChildren(contain: VList) {
  let childList = [],
      keys = Object.keys(contain);

  for (let i = 0; i < keys.length; i++) {
    // 获取所有子节点
    for (let j = 0; j < contain[keys[i]].length; j++) {
      childList.push(contain[keys[i]][j]);
    }
  }

  return childList;
}

/**
 * @description 克隆目标信息，target是结果，model是模板
 * @param {Dom} target 
 * @param {Dom} model 
 */
export function cloneSvgInfo(target: VItem, model: VItem) {
  let keys = Object.keys(model);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == 'contain') {
      target[keys[i]] = {};
      continue;
    }
    target[keys[i]] = model[keys[i]];
  }
}

/**
 * @description 得到一个svg图的实际位置
 * @param {Dom} target 想要知道的目标
 * @param {List} rootList 根列表
 */
export function getTotalPosi(target: any, rootList: VList) {
  let clickList = findList(target, rootList),
      bashX = 0,
      bashY = 0;

  while(clickList !== rootList) {
    let { x, y }: any = getTransform(target);

    bashX += x;
    bashY += y;
    target = $(target).parent()[0];
    clickList = findList(target, rootList);
  }

  let { x, y }: any = getTransform(target);
  bashX += x;
  bashY += y;

  return {
    x: bashX,
    y: bashY
  }
}

/**
 * @author Weybn
 * @version 1.0.0
 * @description 寻找目标积木块所在的list
 * @returns {List} 返回目标积木块所在的list
 * @param {Dom} target 目标的积木块
 * @param {List} listObj 整个根目录的list
 */
export function findList(target: any, listObj: VList): any {
  if (isUndef(target)) {
    throw new Error('the target is Undefinded');
  }

  if (isUndef(listObj)) {
    return null;
  }
  
  let result = null;

  // 查找target是否在这个list对象中
  result = isInList(target, listObj);
  if (result == true) {
    return listObj;
  }

  // 使用递归遍历
  for (let i = 0; i < listObj.circle.length; i++) {
    result = findList(target, listObj.circle[i].contain);
    if (result) {
      return result;
    }
  }

  for (let i = 0; i < listObj.judge.length; i++) {
    result = findList(target, listObj.judge[i].contain);
    if (result) {
      return result;
    }
  }

  return result;
}

/**
 * @description 寻找目标是否在列表中
 * @param {*} target 
 * @param {*} TarListObj 
 */
export function isInList (target: any, TarListObj: VList) {
  // 寻找目标的列表
  if (isUndef(TarListObj)) {
    return false;
  }

  let { id, type }: any = getTypeAndID(target);

  if (TarListObj[type].length === 0) {
    return ;
  }

  for (let i = 0; i < TarListObj[type].length; i++) {
    if (TarListObj[type][i].id === id) {
      return true;
    }
  }

  return false;
}

/**
 * @description 查找目标所在的list
 * @param {Dom} target 目标
 * @param {List} list 想要查询的List，一般是根节点
 */
export function findItem(target: any, list: VList) {
  let resultList = findList(target, list),
      { id, type }: any = getTypeAndID(target);

  for (let i = 0; i < resultList[type].length; i++) {
    if (resultList[type][i].id == id) {
      return resultList[type][i];
    }
  }
  
  return null;
}

/**
 * @description 找到容器节点对应的list表,返回对应的列表,即列表中该对象的contain属性
 * @param {Dom} conTarget 
 * @param {List} list 根列表
 */
export function findConCspList(conTarget: any, list: VList) {
  let placeList = findList(conTarget, list),
      { id, type }: any = getTypeAndID(conTarget);
  for (let i = 0; i < placeList[type].length; i++) {
    if (id == placeList[type][i].id) {
      return placeList[type][i];
    }
  }
  return null;
}

/**
 * @description 进行列表的克隆,仅仅是克隆circle或者judge里面的块，并不会对circle这个目标进行克隆，所以需要创建这个目标，并且用这个目标的contain属性来进行克隆
 * @param {*} tarList 被克隆的目标,传入的是容器的contain属性
 * @param {*} list 新的目标，传入的是容器的contain属性
 */
export function cloneList(tarList: VList, list: VList) {
  // 先清空或者初始化
  componentListMixin(list);

  setTimeout(() => {
    // 这里利用到setTimeout放到下一个事件循环的原因是调用componentListMixin的时候并非同步，
    // 即在遍历的时候会是一个相当于异步操作，所以要等到所有遍历结束，即放到下一个事件循环机制当中去
    svgComponentOption.forEach((value) => {
      if (value == 'circle' || value == 'judge') {
        for (let i = 0; i < tarList[value].length; i++) {
          // 用JSON对对象进行深复制
          list[value].push(
            JSON.parse(
              JSON.stringify(tarList[value][i])
            )
          );
          if (tarList[value][i].contain) {
            cloneList(tarList[value][i].contain, list[value][i].contain);
          }
        }
      } else {
        for (let i = 0; i < tarList[value].length; i++) {
          // 用JSON对对象进行深复制
          list[value].push(
            JSON.parse(
              JSON.stringify(tarList[value][i])
            )
          );
        }
      }
    })
    
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

/**
 * @description 进行创建节点的时候进行初始化积木块
 * @param {List} list 想要进行推进的容器
 * @param {*} type 
 * @param {*} item 
 */
export function listPush(list: any, type: any, item: VItem) {
  if (isSvgContainer(type)) {
    // 如果是判断语句或者选择语句，需要特殊照顾
    item.contain = {
      // shadow: null  //这句shadow是要做阴影时候用的，现在不需要用到
    };
    item.hasCdn = false;
    list[type].push(item);
  } else {
    list[type].push(item)
  }
  // this.$store.state.isRenew = !this.$store.state.isRenew;
}

/**
 * @description 删除节点
 * @param {*} list 
 */
export function deleteFromList(list: Array<VItem>) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].x < 290) {
      list.splice(i, 1);
    }
  }
}

/**
 * @description 判断含有某个类型的积木块
 * @param {String} type 类型
 * @param {*} list 一个展示列表，即一个circle或者judge的contain属性或者根目录
 */
export function listHasTC(type: string, list: VList) {
  return list[type].length !== 0;
}