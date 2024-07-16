import Updatable from '../updatable.js';

export default class extends Updatable {
  isHidden = false;

  constructor(name, trs) {
    super();
    this.name = name;
    this.trs = trs;
  }

  update(appProps) {
    if (!this.isHidden) {
      super.update(appProps);
    }
  }
};