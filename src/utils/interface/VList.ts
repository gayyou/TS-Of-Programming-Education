import { ChildItem, ConItem } from './VItem';

export interface VList {
  [index: string]: Array<any>;
  // 下面是组件
  condition: Array<ChildItem>;
  order: Array<ChildItem>;
  assist: Array<ChildItem>;
  noRefFunc: Array<ChildItem>;
  refFunc: Array<ChildItem>;
  doubleRef: Array<ChildItem>;
  longRefFunc: Array<ChildItem>;
  longRightRef: Array<ChildItem>;

  // 下面是容器
  inOrder: Array<ConItem>;
  circle: Array<ConItem>;
  judge: Array<ConItem>;
}