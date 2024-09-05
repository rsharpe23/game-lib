import { mat4 } from '../../lib/gl-matrix/index.js';
import Drawing from './drawing.js';

export default class extends Drawing {
  matrix = mat4.create();

  constructor(name, trs) {
    super(name, 'mesh');
    this.trs = trs;
  }

  // Установить трансформации во внешнем коде можно 
  // через обращение напрямую к trs

  get position() {
    return this.trs.translation; 
  }

  get rotation() {
    return this.trs.rotation;
  }

  get scale() {
    return this.trs.scale;
  }

  _update(appProps) {
    this._calcMatrix(this.matrix, this.parent?.matrix);
  }

  _calcMatrix(matrix, matrixOfParent) {
    this.trs.calcMatrix(matrix); // матрица модели
    if (matrixOfParent)
      mat4.mul(matrix, matrixOfParent, matrix); // мировая матрица модели
  }
}