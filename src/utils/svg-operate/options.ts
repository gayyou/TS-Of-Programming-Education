/**
 * 这个是while循环的配置
 * bash是第一次嵌套后放置的坐标
 * increationY是每次需要增长的坐标
 * firstBash是第一次的v的大小，第一次的话，这个v只需要加上 increationY - firstBash 以后都要加上increationY
 * firstHalf是第一部分的，要加上firstbash+n * increationY再拼上lastHalf作为path标签的d属性
 */
export const whileOption = {
  pathBash: 12,
  bashX: 24.2,
  bashY: 48,
  firstBash: 24,
  firstHalf: 'M184.2,0H12C5.4,0,0,5.4,0,12v',
  lastHalf: 'v24v12c0,6.6,5.4,12,12,12h62c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28 c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h156.2c13.3,0,24-10.7,24-24v0C208.2,10.7,197.4,0,184.2,0z'
}

export const judgeOption = {
  // 第一个和第二个不用多说，就是嵌入块的基础坐标
  bashX: 24,
  bashY: 48,
  bashSecondY: 120,
  // 这个是内嵌进else的时候需要改变的对象，主要改变的是最后一个。
  elseText: {
    firstHalf: 'matrix(1 0 0 1 24.3335 ',
    lastHalf: ' )',
    bash: 100
  },
  firstHalf: 'M140,24L140,24c0-13.3-10.7-24-24-24L12,0C5.4,0,0,5.4,0,12v36v24v48v',
  firstBash: 24,
  secondHalf: 'v12c0,6.6,5.4,12,12,12h46   c6.6,0,12-5.4,12-12v0c0-6.6-5.4-12-12-12H28c-2.2,0-4-1.8-4-4v',
  secondBash: -16,
  lastHalf: 'c0-2.2,1.8-4,4-4h88c13.3,0,24-10.7,24-24v0   c0-13.3-10.7-24-24-24H28c-2.2,0-4-1.8-4-4V52c0-2.2,1.8-4,4-4h88C129.3,48,140,37.3,140,24z',
}

export const renewWhileOption = {
  firstBash: 36,
  currentY: 48
}

export const renewJudgeOption = {
  firstBash: 24,
  secondBash: -16,
  textBash: 100.3763,
  currentY: 48,
  firstTime: 1,
  currentSecondY: 120
}