export interface VItem {
  [index: string]: any;
  
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  value: Array<any>;
}

export interface ConItem extends VItem {
  condition: any;
  contain: any;
  svgOptions: any;
}

export interface ChildItem extends VItem {
  func: string;
}