import { getTypeAndID, isUndef } from './common-utils';
import { svgContainer } from '../models/model';

export function isSvgContainer(checkTarget: any) {
  const checkDom = (target: any) => {
    let { type }: any = getTypeAndID(target);

    return svgContainer.includes(type);
  }

  const checkType = (str: string) => {
    return svgContainer.includes(str);
  }

  if (typeof checkTarget === 'string') {
    return checkType(checkTarget)
  } else {
    return checkDom(checkTarget);
  }
}

/**
 * @description 获得svg图块的宽高
 * @param {Dom} target 目标dom节点
 */
export function getSvgWH(target: any) {
  if (isUndef(target) || target == null) {
    return null;
  }

  let boxInfo = target.getBBox(),
      width = boxInfo.width,
      height = boxInfo.height;
  
  return {
    width,
    height
  }
}

/**
 * @version 1.0.0
 * @description 获得target的位置
 * @param {Dom} target 获得target的位置 
 * @returns { x, y }
 */
export function getTransform(target: any) {
  if (isUndef(target)) {
    return null;
  }

  let transInfo = target.getAttribute('transform'),
      x = parseInt(transInfo.split('(')[1].split(',')[0]),
      y = parseInt(transInfo.split(',')[1].split(')')[0]);
  
  return {
    x,
    y
  }
}

/**
 * 
 * @param {Dom} target 
 * @param {x, y} payLoad 传入一个函数，有x值和y值，为这个target设置位置
 */
export function setTransform(target: any, payLoad: any) {
  target.setAttribute('transform', 'translate(' + payLoad.x + ',' + payLoad.y + ')');
}