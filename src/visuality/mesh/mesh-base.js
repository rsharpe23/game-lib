import Visuality from '../visuality.js';
import { find } from '../../../mixins/list-mixin.js';

export default class MeshBase extends Visuality {
  constructor(name, trs, geometry) {
    super(name, trs);
    this.setGeometry(geometry);
  }

  get items() {
    return this._items ??= Array.from(this.geometry);
  }

  setGeometry(value) {
    if (this.geometry === value) return;
    this.geometry = value;
    this._items = null; 
  }
}

Object.assign(MeshBase.prototype, { find });