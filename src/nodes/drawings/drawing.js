import Node from '../node.js';

// Drawings-ноды отличаются лишь тем, что вызывают gl.draw*.
// Подход смешивания логики и отрисовки внутри одного метода update()
// был выбран из-за того, что практически каждый нод обращается к api webgl; 
// будь то сцена, свет, камера, меш и т.д. Из-за этого сложно определить, 
// какая логика относится к отрисовке, а какая нет.

export default class extends Node {
  isHidden = false;
  prog = null;

  update(appProps) {
    if (this.isHidden) return;
    this._useProgram(appProps);
    super.update(appProps);
  }

  _useProgram(appProps) {
    (this.prog ?? appProps.prog).use(appProps.gl);
  }
}