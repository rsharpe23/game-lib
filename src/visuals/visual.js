import Updatable from '../updatable.js';

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

  // Можно добавить еще геттеры: position, rotation, scale

  update(appProps) {
    if (this.isHidden) return;
    super.update(appProps);
  }
}