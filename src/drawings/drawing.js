import Node from '../node.js';

// Drawings-ноды отличаются лишь тем, что вызывают gl.draw*.
// Подход смешивания логики и отрисовки в внутри одного метода update()
// был выбран из-за того, что практически каждый нод обращается к api webgl; 
// будь то сцена, свет, камера, меш и т.д. Из-за этого сложно определить, 
// какая логика относится к отрисовке, а какая нет.

export default class extends Node {
  isHidden = false;
  prog = null;

  update(appProps) {
    if (this.isHidden) return;
    (this.prog ?? appProps.prog).use(appProps.gl);
    super.update(appProps);
  }
}