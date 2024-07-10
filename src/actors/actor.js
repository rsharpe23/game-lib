import Renderer from '../renderer.js';

export default class extends Renderer {
  isHidden = false;

  constructor(name, trs) {
    super();
    this.name = name;
    this.trs = trs;
  }

  render(appProps) {
    if (!this.isHidden) super.render(appProps);
  }
};