import { mat4 } from '../../../lib/gl-matrix/index.js';
import MatrixProvider from '../matrix-provider.js';

export default class extends MatrixProvider {
  parent = null;
  children = [];
  
  // Эти трансформации соотв. единичной матрице, 
  // создаваемой через mat4.create()
  translation = [0, 0, 0];
  rotation = [0, 0, 0, 1];
  scale = [1, 1, 1];

  constructor({ translation, rotation, scale } = {}, parent) { 
    super();
    if (translation) this.setTranslation(...translation);
    if (rotation) this.setRotation(...rotation);
    if (scale) this.setScale(...scale);
    if (parent) this.setParent(parent);
  }

  setTranslation(x, y, z) {
    this.translation[0] = x;
    this.translation[1] = y;
    this.translation[2] = z;
  }

  setRotation(x, y, z, w) {
    this.rotation[0] = x;
    this.rotation[1] = y;
    this.rotation[2] = z;
    this.rotation[3] = w;
  }

  setScale(x, y, z) {
    this.scale[0] = x;
    this.scale[1] = y;
    this.scale[2] = z;
  }

  setParent(value) {
    const { parent } = this;
    if (value === parent) return;
    if (parent) parent.removeChild(this);
    if (value) value.addChild(this);
    this.parent = value;
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children.remove(child);
  }

  _calcWorldMatrix(out) {
    this._calcLocalMatrix(out);
    if (this.parent) {
      mat4.mul(out, this.parent.matrix, out);
    }
  }

  _calcLocalMatrix(out) {
    mat4.fromRotationTranslationScale(out, 
      this.rotation, this.translation, this.scale);
  }
}