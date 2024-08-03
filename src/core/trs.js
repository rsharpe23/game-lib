import { mat4 } from '../../lib/gl-matrix';

export default class {
  _matrix = mat4.create();
  _changed = false;

  _translation = [0, 0, 0];
  _rotation = [0, 0, 0, 1];
  _scale = [1, 1, 1];
  _parent = null;

  constructor({ translation, rotation, scale } = {}, parent) {
    if (translation) this.translation = translation;
    if (rotation) this.rotation = rotation;
    if (scale) this.scale = scale;
    if (parent) this.parent = parent;
  }

  get translation() { return this._translation; }
  set translation(value) {
    this._translation = value;
    this.onChange();
  }

  get rotation() { return this._rotation; }
  set rotation(value) {
    this._rotation = value;
    this.onChange();
  }

  get scale() { return this._scale; }
  set scale(value) {
    this._scale = value;
    this.onChange();
  }

  get parent() { return this._parent; }
  set parent(value) {
    // Перед тем, как задать новый parent, нужно очистить предыдущий, 
    // иначе получится так, что trs, который уже не является 
    // parent'ом, при обновлении будет дёргать onChange 
    // тех trs, к которым уже не относится
    if (this._parent) {
      const { origin } = this._parent.onChange;
      if (origin) this._parent.onChange = origin;
    }

    // Это условие должно идти вторым, т.к. если задавать parent'ом 
    // один и тот же trs, то получится цепочка ф-ций, 
    // в которых origin будет иметь зависимости
    if (value) {
      const { onChange } = value;
      value.onChange = Object.assign(() => {
        onChange.call(value);
        this.onChange();
      }, { origin: onChange });
    }

    this._parent = value;
    this.onChange();
  }

  get matrix() {
    if (this._changed) {
      this._calcWorldMatrix(this._matrix);
      this._changed = false;
    }

    return this._matrix;
  }

  onChange() {
    this._changed = true;
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