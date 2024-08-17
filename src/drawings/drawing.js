import Node from '../node.js';

// Компоненты drawings отличаются лишь тем, что вызывают gl.draw*

// Подход, смешивания логики и отрисовки в одном месте (внутри update) 
// был выбран из-за того, что практически каждый нод обращается к api webgl; 
// будь то сцена, свет, камера, меш и т.д. Из-за этого сложно определить, 
// какая логика относится к отрисовке, а какая нет.

export default class extends Node {
  isHidden = false;
  // Может хранить данные пользовательского рендеринга, 
  // например: материал, текстуры, программу и пр.
  renderProps = {};

  get prog() {
    return this.renderProps.prog;
  }

  // Возможно это лучше перенести в Updatable
  update(appProps) {
    if (this.isHidden) return;
    super.update(appProps);
  }
}