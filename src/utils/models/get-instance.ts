import { VList } from '../interface/VList';
import { VItem } from '../interface/VItem';

// 有类型的数据初始化的时候很麻烦，这里就直接调用这个函数进行数据的初始化

export const getVList = (): VList => {
  return {
    // 下面是组件
    condition: [],
    order: [],
    assist: [],
    noRefFunc: [],
    refFunc: [],
    doubleRef: [],
    longRefFunc: [],
    longRightRef: [],

    // 下面是容器
    inOrder: [],
    circle: [],
    judge: []
  }
}

export const getConItem = (): VItem => {
  return {
    id: '',
    x: NaN,
    y: NaN,
    width: NaN,
    height: NaN,
    type: '',
    value: [],
    condition: null,
    contain: null,
    svgOptions: null
  }
}

export const getChildItem = (): VItem => {
  return {
    id: '',
    x: NaN,
    y: NaN,
    width: NaN,
    height: NaN,
    type: '',
    value: [],
    func: ''
  }
}

