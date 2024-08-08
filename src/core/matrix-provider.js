import { mat4 } from '../../lib/gl-matrix/index.js';

export default class {
  _matrix = mat4.create();

  get matrix() {
    this._calcMatrix(this._matrix);
    return this._matrix;
  }
}