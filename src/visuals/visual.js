import Updatable from '../updatable.js';

export default class extends Updatable {
  tag = 'default';
  isHidden = false;
  // Может хранить любые данные пользовательского 
  // рендеринга, например: материал, вспом. текстуры 
  // и обязательно шейдерную программу для их обработки.
  renderProps = {};

  constructor(name, trs) {
    super();
    this.name = name;
    this.trs = trs;
  }

  get prog() {
    return this.renderProps.prog;
  }

  update(appProps) {
    if (this.isHidden) return;
    super.update(appProps);
  }
}