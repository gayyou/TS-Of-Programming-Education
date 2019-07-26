import { renewWhileOption, renewJudgeOption } from '../svg-operate/options';

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

/**
 *
 * @param {} advice 
 */
export function dataToView(advice: any) {
  return viewItem(advice, 1);
}

/**
 * @TODO 你们要做的事情第一个就是把codeItem列出来作为一个接口
 * @param codeItem 
 * @param posiY 
 */
function viewItem(codeItem: any, posiY: number) {
  let keys = Object.keys(funcMountCom),
      type: string = codeItem.type,
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
    svgOptions: createOption(type),
    hasCdn: 'getCdnName(codeItem)',
    contain: codeItem.children.length ? getChildren(codeItem) : null
  } : {
    id: getRecID(),
    func: func,
    y: posiY,
    value: [blockText, param],
  }
}

/**
 * @TODO 定义一个codeItem的接口
 * @param codeItem 
 */
function getChildren(codeItem: any) {
  let getWhile = (codeItem: any) => {
    let y = 0.1,
        resultArr = [];
    for (let i = 0; codeItem.children.length; i++) {
      console.log(codeItem)
      resultArr.push(viewItem(codeItem.children[i], 0.1));
      y += 0.1;
    }
  }

  let getJudge = (codeItem: any) => {
    let y = 0.1,
        resultArr: any[] = [];
    for (let i = 0; codeItem.children.length; i++) {
      if (codeItem.children[i].type == 'else') {
        resultArr = [...resultArr, viewItem(codeItem.children[i], y + renewJudgeOption.textBash).contain];
      } else {
        resultArr.push(viewItem(codeItem.children[i], y + renewJudgeOption.textBash));
      }
      y += 0.1;
    }
    return resultArr;
  }

  switch(codeItem.type) {
    case 'if': {
      return getJudge(codeItem)
    }

    case 'while': {
      return getWhile(codeItem)
    }

    default: console.log('错误')
  }
}