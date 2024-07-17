import Visual from '../visual.js';
import ItemList from './item-list.js';

export default class extends Visual {
  constructor(name, trs, geometry, texImg) {
    super(name, trs);
    this.texImg = texImg;
    this.items = new ItemList(geometry);
  }

  get geometry() {
    return this.items.geometry;
  }

  findItem(name) {
    return this.items.find(item => item.name === name);
  }
}