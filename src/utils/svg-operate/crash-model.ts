import { VList } from '../interface/VList';
import { getTypeAndID } from '../shared/common-utils';
import { getTotalPosi } from '../shared/vlist-utils';
import { isSvgContainer } from '../shared/svg-utils';

/**
 * @description 判断是否碰撞了，返回碰撞的一个对象，对象的内容有 碰撞对象、碰撞部分
 * @param {*} target 
 * @param {*} list 
 * @returns { container, dirX, dirY } container为容器，dirX有两个值 1 为左边，2为右边,dirY有两个值，1为上方，2为下方
 */
export function isCrash(this: any, target: any, rootList: VList, payload: any = {}) {
  let resData = null;
  resData = checkCrash(target, rootList, rootList, payload);

  if (resData == null) {
    let { type } = getTypeAndID(target);
    if (type == 'condition') {
      // 如果是判断语句的话，会比其他多一层判断
      resData = checkCondition(target, rootList, rootList, payload);
    }
  }

  return resData;
}

function checkCondition(target: any, list: VList, rootList: VList, beforeChangeSizeCon: any): any {
  let { id: targetID } = getTypeAndID(target),
      { x: targetX, y: targetY } = getTotalPosi(target, rootList);

  let tempX, tempY, tempW, tempH, tempID;
  let xFlag, yFlag,
      keys = Object.keys(list);

      for (let i = 0; i < keys.length; i++) {
        if (!isSvgContainer(keys[i])) {
          // 不是容器的话，跳过
          continue;
        }
    
        for (let j = 0; j < list[keys[i]].length; j++) {
          let item = list[keys[i]][j];
    
          if (item.id == targetID) {
            continue;
          }
    
          xFlag = 0;
          yFlag = 0;
    
          tempW = item.width;
          tempH = item.height;
          tempID = item.id;
    
          if (list == rootList) {
            // 区分碰撞的容器是否在根目录下，不在的话需要进行获取绝对坐标
            tempX = item.x;
            tempY = item.y;
          } else {
            let con = $('#' + tempID)[0];
            let { x: conX, y: conY } = getTotalPosi(con, rootList);
            tempX = conX;
            tempY = conY;
          }
    
          if (beforeChangeSizeCon && tempID == beforeChangeSizeCon.id && beforeChangeSizeCon.isUsed == false) {
            tempW = beforeChangeSizeCon.width;
            tempH = beforeChangeSizeCon.height;
            beforeChangeSizeCon.isUsed = true;
          }
          
          // console.log(targetX, tempX, tempW)
          // console.log(targetY, tempY, tempH)

          if (targetX - tempX > -30 && targetX - tempX < tempW) {
            xFlag = 1;
          }
    
          if (targetY - tempY > -30 && targetY - tempY < 48) {
            yFlag = 1;
          }
    
          if (yFlag == 1 && xFlag == 1) {
            return {
              container: $('#' + tempID)[0],
              dirX: xFlag,
              dirY: yFlag
            }
          }
    
          if (item.contain) {
            // 递归遍历
            let result = checkCondition(target, list[keys[i]][j].contain, rootList, beforeChangeSizeCon);
    
            if (result) {
              return result;
            }
          }
        }
      }
}

function checkCrash(this: any, target: any, list: VList, rootList: VList, beforeChangeSizeCon: any): any {
  let { id: targetID, type } = getTypeAndID(target),
      { x: targetX, y: targetY } = getTotalPosi(target, rootList);

  if (type == 'condition') {
    return null;
  }

  let tempX, tempY, tempW, tempH, tempID;
  let xFlag, yFlag,
      keys = Object.keys(list);

  for (let i = 0; i < keys.length; i++) {
    if (!isSvgContainer(keys[i])) {
      // console.log('不是容器', keys[i])
      // 不是容器的话，跳过
      continue;
    }

    for (let j = 0; j < list[keys[i]].length; j++) {
      let item = list[keys[i]][j];

      if (item.id == targetID) {
        continue;
      }

      xFlag = 0;
      yFlag = 0;

      tempW = item.width;
      tempH = item.height;
      tempID = item.id;

      
      let con = $('#' + tempID)[0];
      let { x: conX, y: conY } = getTotalPosi(con, rootList);
      tempX = conX;
      tempY = conY;
      

      if (beforeChangeSizeCon && tempID == beforeChangeSizeCon.id && beforeChangeSizeCon.isUsed == false) {
        tempW = beforeChangeSizeCon.width;
        tempH = beforeChangeSizeCon.height;
        beforeChangeSizeCon.isUsed = true;
      }

      if (targetX - tempX > 0 && targetX - tempX < 26) {
        xFlag = 1;
      }

      if (targetY - tempY > 0 && targetY - tempY < tempH) {
        if (item.type == 'judge') {
          // console.log()
          if (targetY - tempY < item.svgOptions.textBash) {
            yFlag = 0;  // 放在if中
          } else {
            yFlag = 1;  // 放在else中
          }
        } else {
          yFlag = 0;
        }
      }

      if (xFlag == 1) {
        return {
          container: $('#' + tempID)[0],
          dirX: xFlag,
          dirY: yFlag
        }
      }

      if (item.contain) {
        // 递归遍历
        let result = checkCrash(target, list[keys[i]][j].contain, rootList, beforeChangeSizeCon);

        if (result) {
          return result;
        }
      }
    }
  }

  // 找不到，返回空指针
  return null;
}