export default class extends Array {
  constructor(geometry) {
    super();
    geometry.forEach(node => this.push(node));
    Object.freeze(this);
  }
}