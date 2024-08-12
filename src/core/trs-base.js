import { mat4 } from "../../lib/gl-matrix/index.js";
import MatrixProvider from "./matrix-provider.js";

export default class extends MatrixProvider {
  parent = null;
  children = [];

  // Дефолтные трансформации, соответствуют единичной 
  // матрице, создаваемой через mat4.create()
  translation = [0, 0, 0]; 
  rotation = [0, 0, 0, 1]; 
  scale = [1, 1, 1];

  // Объект позволяют указывать только часть трансформаций, при необходим.
  constructor({ translation, rotation, scale } = {}, parent) {
    super();
    if (translation) this.setTranslation(translation);
    if (rotation) this.setRotation(rotation);
    if (scale) this.setScale(scale);
    if (parent) this.setParent(parent);
  }

  setParent(value) {
    if (value === this.parent) return;
    this._setParent(value);
  }

  _setParent(value) {
    this.parent?.removeChild(this);
    value?.addChild(this);
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