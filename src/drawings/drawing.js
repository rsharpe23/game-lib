import Updatable from '../updatable.js';

// Подход, смешивания логики и отрисовки в одном месте (внутри update) 
// был выбран из-за того, что каждый компонент верхнего уровня обращается 
// к api webgl; будь то сцена, свет, камера, меш и т.д. Из-за этого сложно 
// определить, какая логика относится к отрисовке, а какакя нет.

// Компоненты drawings отличаются лишь тем, что вызывают ф-цию gl.draw*

export default class extends Updatable {
  tag = 'default';
  isHidden = false;
  // Может хранить данные пользовательского рендеринга, 
  // например: материал, текстуры, программу и пр.
  renderProps = {};

  constructor(name) {
    super();
    this.name = name;
  }

  get prog() {
    return this.renderProps.prog;
  }

  update(appProps) {
    if (this.isHidden) return;
    super.update(appProps);
  }
}