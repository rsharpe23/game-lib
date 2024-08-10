import { mat4 } from '../../../lib/gl-matrix/index.js';
import MatrixProvider from '../matrix-provider.js';

export default class extends MatrixProvider {
  children = [];

  // Объект позволяют указ. только часть трансформаций, при необходим.
  // Все трансформации, задаваемые по умолчанию, соответствуют 
  // единичной матрице, создаваемой с пом. mat4.create()
  constructor({ translation, rotation, scale } = {}, parent) {
    super();
    this.translation = translation ?? [0, 0, 0];
    this.rotation = rotation ?? [0, 0, 0, 1];
    this.scale = scale ?? [1, 1, 1];
    this.parent = parent;
  }

  get parent() { return this._parent; }
  set parent(value) {
    if (value === this.parent) return;
    this.parent?.removeChild(this);
    value?.addChild(this);
    this._setParent(value);
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children.remove(child);
  }

  _setParent(value) {
    this._parent = value;
  }

  _calcMatrix(out) {
    this._calcLocalMatrix(out);
    if (this.parent) {
      mat4.mul(out, this.parent.matrix, out); // мировая матрица
    }
  }

  _calcLocalMatrix(out) {
    mat4.fromRotationTranslationScale(out, 
      this.rotation, this.translation, this.scale);
  }
}