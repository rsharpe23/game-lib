import Visual from '../visual.js';

export default class MeshBase extends Visual {
  constructor(name, trs, items) {
    super(name, trs);
    this.items = items;
  }

  get geometry() {
    return this.items.geometry;
  }

  findItem(name) {
    return this.items.find(item => item.name === name);
  }
}