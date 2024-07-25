export default class extends Array {
  constructor(geometry) {
    super();
    this._geometry = geometry;
    geometry.traverse(node => this.push(node));
    Object.freeze(this);
  }
  
  get geometry() {
    return this._geometry;
  }
}