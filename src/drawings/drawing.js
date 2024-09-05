import Node from '../node.js';

// Drawings-ноды отличаются лишь тем, что вызывают gl.draw*.

// Подход, смешивания логики и отрисовки в одном месте (внутри update) 
// был выбран из-за того, что практически каждый нод обращается к api webgl; 
// будь то сцена, свет, камера, меш и т.д. Из-за этого сложно определить, 
// какая логика относится к отрисовке, а какая нет.

// Здесь должна устанавливаться локальная программа

export default class extends Node {
  isHidden = false;
  // Может хранить данные пользовательского рендеринга, 
  // например: материалы, текстуры, программу и пр.
  renderProps = {};

  // Попробовать вынести из renderProps
  get prog() {
    return this.renderProps.prog;
  }

  update(appProps) {
    if (this.isHidden) return;
    super.update(appProps);
  }
}