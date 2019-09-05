import { renewWhileOption, renewJudgeOption } from '../svg-operate/options';
import { getVList } from './get-instance';
import { Container } from 'element-ui';

/**
 * 
 * @param {String} type 创建选项
 */
function createOption(type: string) {
  return type == 'while' ? Object.assign(renewWhileOption) : Object.assign(renewJudgeOption);
}

const funcMountCom: any = {
  'condition': [
    'check_thing'
  ],
  'order': [
    'delay_ms'
  ],
  'assist': [
    'open_arm', 
    'close_arm'
  ],
  'noRefFunc': [],
  'refFunc': [],
  'circle': [],
  'judge': [],
  'doubleRef': [
    'move_ahead', 
    'move_behind', 
    'move_left', 
    'move_right'
  ],
  'longRefFunc': [
    'set_height', 
    'set_low'
  ],
  'longRightRef': [
    'move_arm_high_up', 
    'move_arm_high_down', 
    'move_arm_low_up', 
    'move_arm_low_down', 
    'move_arm_left', 
    'move_arm_right'
  ],
  'inOrder': []
}

const funcValue: any = {
  // [index: string]: Array<any>,
  'move_arm_high_up': ['机械臂上臂向上摆动', '度'], 
  'move_arm_high_down': ['机械臂上臂向下摆动', '度'], 
  'move_arm_low_up': ['机械臂下臂向上摆动', '度'], 
  'move_arm_low_down': ['机械臂下臂向下摆动', '度'], 
  'move_arm_left': ['机械臂向左摆动', '度'], 
  'move_arm_right': ['机械臂向左摆动', '度'],
  'move_ahead': ['向前移动', '速度', '秒'], 
  'move_behind': ['向后移动', '速度', '秒'], 
  'move_left': ['向左移动', '速度', '秒'], 
  'move_right': ['向右移动', '速度', '秒'],
  'set_height': ['将', '引脚置为高电平'],
  'set_low': ['将', '引脚置为低电平'],
  'open_arm': ['合并机械臂'], 
  'close_arm': ['松开机械臂'],
  'delay_ms': ['延时', '秒'],
  'check_thing': ['前方存在障碍物']
}

let count = 0;

function getRecID() {
  return 'recEl' + count++;
}


let a = {
  "type": "while",
  "tab": "1",
  "ops": null,
  "condition": "True",
  "children": [
      {
          "type": "if",
          "tab": "2",
          "ops": null,
          "condition": "前方有障碍物",
          "children": [
              {
                  "type": null,
                  "tab": "3",
                  "ops": "move_arm_right(1)",
                  "condition": "",
                  "children": null
              },
              {
                  "type": "while",
                  "tab": "3",
                  "ops": null,
                  "condition": "x < 10",
                  "children": [
                      {
                          "type": null,
                          "tab": "4",
                          "ops": "move_arm_right(1)",
                          "condition": "",
                          "children": null
                      }
                  ]
              },
              {
                  "type": "else",
                  "tab": "2",
                  "ops": null,
                  "condition": "",
                  "children": [
                      {
                          "type": null,
                          "tab": "3",
                          "ops": "move_arm_right(1)",
                          "condition": "",
                          "children": null
                      }
                  ]
              }
          ]
      }
  ]
}
console.log(123)
console.log(dataToView(a))
/**
 *
 * @param {} advice 
 */
export function dataToView(advice: any) {
  let contain = getVList();
  contain.circle.push(viewItem(advice, 1));
  return contain;
  // return viewItem(advice, 1);
}

/**
 * @TODO 你们要做的事情第一个就是把codeItem列出来作为一个接口
 * @param codeItem 
 * @param posiY 
 */
function viewItem(codeItem: any, posiY: number) {
  let keys = Object.keys(funcMountCom),
      type: any = codeItem.type ? codeItem.type : null,
      func: string = codeItem.ops !== null ? codeItem.ops.split('(')[0] : null,
      param: any = codeItem.ops !== null ? codeItem.ops.split('(')[1].split(')')[0].split(',') : null,
      viewName: string = '',
      isContain: boolean = false,
      blockText: string = func !== null ? funcValue[func] : null;
      
  if (type) {
    switch(type) {
      case 'if': {
        viewName = 'judge';
        isContain = true;
        break;
      }

      case 'while': {
        viewName = 'circle';
        isContain = true;
        break;
      }

      case 'else': {
        viewName = 'else';
        isContain = true;
        break;
      }
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < funcMountCom[keys[i]].length; j++) {
        if (funcMountCom[keys[i]][j] == func) {
          viewName = keys[i];
          break;
        }
      }
    }
  }

  return isContain ? {
    id: getRecID(),
    type: viewName,
    // value: value,
    y: posiY,
    x: 0,
    svgOptions: createOption(type),
    hasCdn: false,
    contain: codeItem.children.length ? getChildren(codeItem) : null
  } : {
    type: viewName,
    id: getRecID(),
    func: func,
    y: posiY,
    x: 1,
    value: [blockText, param],
  }
}

/**
 * @TODO 定义一个codeItem的接口
 * @param codeItem 
 */
function getChildren(codeItem: any): any {
  let getWhile = (codeItem: any): any => {
    let y = 0.1,
        resultContain = getVList();
    for (let i = 0; i < codeItem.children.length; i++) {
      let temp = viewItem(codeItem.children[i], 0.1 + y);
      resultContain[temp.type].push(temp);
      y += 0.1;
    }

    return resultContain;
  }

  let getJudge = (codeItem: any): any => {
    let y = 0.1,
        resultContain = getVList();
    for (let i = 0; i < codeItem.children.length; i++) {
      if (codeItem.children[i].type == 'else') {
        let temp = viewItem(codeItem.children[i], y + renewJudgeOption.textBash).contain;
        for (let item in temp) {
          resultContain[item] = [...resultContain[item], ...temp[item]];
        }
      } else {
        let temp = viewItem(codeItem.children[i], y + renewJudgeOption.textBash);
        resultContain[temp.type].push(temp);
      }
      y += 0.1;
    }
    return resultContain;
  }

  switch(codeItem.type) {
    case 'if': {
      return getJudge(codeItem)
    }

    case 'else': {
      return getJudge(codeItem)
    }

    case 'while': {
      return getWhile(codeItem)
    }

    default: {
      console.log('错误')
    }
  }
}

