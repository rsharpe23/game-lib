import { mat4 } from '../../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../../lib/gl-utils.js';

// Вычисление матрицы внутри свойства, как было реализовано в MatrixProvider, 
// не подходит в некоторых случаях, например здесь. Это из-за того, что 
// расчёт будет выполняется в каждом из объектов, который это свойство вызывает, 
// а нужно чтобы он выполнялся только один раз за итерацию, внутри камеры

export default class {
  matrix = mat4.create();

  apply(gl, prog) {
    this._calcMatrix(this.matrix);
    setMatrixUniform(gl, prog.u_PMatrix, this.matrix);
  }
};