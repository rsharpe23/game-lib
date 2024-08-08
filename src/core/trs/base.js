import { mat4 } from '../../../lib/gl-matrix/index.js';
import MatrixProvider from '../matrix-provider.js';

export default class extends MatrixProvider {
  childs = [];

  constructor({ translation, rotation, scale } = {}, parent) {
    super();
    this.translation = translation ?? [0, 0, 0];
    this.rotation = rotation ?? [0, 0, 0, 1];
    this.scale = scale ?? [1, 1, 1];
    this.setParent(parent);
  }

  setParent(value) {
    const { parent } = this;
    if (value === parent) return;
    if (parent) parent.removeChild(this);
    if (value) value.addChild(this);
    this.parent = value;
  }

  addChild(child) {
    const { childs, parent } = this;
    childs.push(child);
    if (parent) parent.addChild(child);
  }

  removeChild(child) {
    const { childs, parent } = this;
    childs.remove(child);
    if (parent) parent.removeChild(child);
  }

  _calcMatrix(out) {
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