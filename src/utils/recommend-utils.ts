export function getSvgCenterPosi(container: any) {
  let $parent = $(container).parent();
  let conW: number = $parent.width() || 0,
      conH: number = $parent.height() || 0;

  let containG = container.getElementsByTagName('g')[0],
      targetConfig = containG.getBBox(),
      tarW: number = targetConfig.width,
      tarH: number = targetConfig.height;
  let scales;

  if (tarH > conH) {
    scales = conH / (tarH) * 0.9;
  } else {
    scales = tarH / (conH) * 0.9;
  }

  tarW = tarW * scales;
  tarH = tarH * scales;

  let x = (conW - tarW) / 2;
  let y = (conH - tarH) / 2;

  return {
    x,
    y,
    scales,
  }
}