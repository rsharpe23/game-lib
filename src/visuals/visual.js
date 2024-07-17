import Updatable from '../updatable.js';

export default class extends Updatable {
  tag = 'default';
  isHidden = false;
  // Может хранить любые данные пользовательского 
  // рендеринга, например: материал, вспом. текстуры, 
  // шейдерную программу и др.
  renderProps = {};

  constructor(name, trs) {
    super();
    this.name = name;
    this.trs = trs;
  }

  update(appProps) {
    if (this.isHidden) return;
    super.update(appProps);
  }
}