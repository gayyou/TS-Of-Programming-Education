export interface VItem {
  [index: string]: any;
  
  id: String;
  x: Number;
  y: Number;
  width: Number;
  height: Number;
  type: String;
  value: Array<any>;
}

export interface ConItem extends VItem {
  condition: any;
  contain: any;
  svgOptions: any;
}

export interface ChildItem extends VItem {
  func: String;
}