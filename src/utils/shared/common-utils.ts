import { VItem } from '../interface/VItem';

export function checkData(data: any): boolean {
  let isTrue = true;

  if (data.type == 'if' || data.type == 'while' || data.type == 'circle' || data.type == 'judge') {
    if (data.condition == null) {
      return false;
    }
  }

  for (let i = 0; i < data.children.length; i++) {
    isTrue = checkData(data.children[i]);
  }

  return isTrue;
}

export function isUndef(tar: any) {
  return typeof tar === 'undefined';
}

/**
 * @description 获得目标的类型和ID
 * @param {Dom} target 目标dom节点
 */
export function getTypeAndID(target: any) {
  if (isUndef(target)) {
    return {
      id: null,
      type: null
    };
  }

  return {
    id: target.getAttribute('id'),
    type: target.getAttribute('data-type')
  }
}

/**
 * @description 插入升序排序
 * @param {List} list 排序列表，这个列表是某个容器的所有子节点，需要进行获取
 */
export function insertSort(list: Array<VItem>) {
  let i, j, k;

    for (i = 1; i < list.length; i++)
    {
        //为a[i]在前面的a[0...i-1]有序区间中找一个合适的位置
        for (j = i - 1; j >= 0; j--) {
          if (list[j].y < list[i].y) {
            break;
          }
        }

        //如找到了一个合适的位置
        if (j != i - 1) {
          //将比a[i]大的数据向后移
          let temp = list[i];
          for (k = i - 1; k > j; k--) {
            list[k + 1] = list[k];
          }
              
          //将a[i]放到正确位置上
          list[k + 1] = temp;
        }
    }
}