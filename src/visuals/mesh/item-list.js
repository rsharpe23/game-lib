export default class extends Array {
  constructor(geometry) {
    super(...geometry);
    this._geometry = geometry;
    Object.freeze(this);
  }
  
  get geometry() {
    return this._geometry;
  }
}