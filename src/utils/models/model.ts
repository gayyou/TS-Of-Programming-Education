/**
 * 当前组件的名称配置,
 * @see 特别注意到circle和judge是在最后两位进行的
 */
export const svgComponentOption = [
  'condition',
  'order',
  'assist',
  'noRefFunc',
  'refFunc',
  'circle',
  'judge',
  'doubleRef',
  'longRefFunc',
  'longRightRef',
  'inOrder'
]

export const svgContainer = [
  'judge',
  'circle',
  'inOrder'
]

// 存储函数名，可用来校验
export const funcName = {
  move: [
    'move_ahead',
    'move_behind',
    'move_left',
    'move_right'
  ],
  eleLev: [
    'set_hight',
    'set_low'
  ],
  photo: [
    'take_photo',
    'show_photo'
  ],
  armOperate: [
    'open_arm',
    'close_arm',
    'move_arm_high_up',
    'move_arm_high_down',
    'move_arm_low_up',
    'move_arm_low_down',
    'move_arm_left',
    'move_arm_right',
  ],
  condition: [
    'check_thing',
    'compare_tow_num',
    'check_thing'
  ],
  assit: [
    'delay_ms',
    'set_x'
  ]
}