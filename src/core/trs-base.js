import { mat4 } from "../../lib/gl-matrix/index.js";

export default class {
  parent = null;
  children = [];

  translation = [0, 0, 0]; 
  rotation = [0, 0, 0, 1]; 
  scale = [1, 1, 1];

  // Дефолтные трансформации, соответствуют единичной 
  // матрице, создаваемой через mat4.create()
  _matrix = mat4.create();

  // Сеттеры определены методами из-за того, что в производном классе нельзя 
  // переопределить data-свойства аксессорами, т.к. аксессоры хранятся в прототипе, 
  // а data-свойства в объекте (из-за чего перекрывают их). В этом случае нужно 
  // определять аксессоры сначала в базовом классе, а затем переопределять их в 
  // производном, что слишком раздуто. Проще всего сделать сеттеры методами.

  // Объект позволяют указывать только часть трансформаций, при необходимости
  constructor({ translation, rotation, scale } = {}, parent) {
    if (translation) this.setTranslation(translation);
    if (rotation) this.setRotation(rotation);
    if (scale) this.setScale(scale);
    if (parent) this.setParent(parent);
  }

  get matrix() {
    this._calcMatrix(this._matrix);
    return this._matrix;
  } 

  setParent(value) {
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