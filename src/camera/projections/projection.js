import { mat4 } from '../../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../../lib/gl-utils.js';

// Projection и TRS могли бы наследоваться от класса 
// MatrixProvider, со свойством matrix и методом onChange()

export default class {
  _matrix = mat4.create();

  get matrix() { 
    // Можно оптимизировать, как в TRS
    this._calcMatrix(this._matrix);
    return this._matrix;
  }

  setMatrixUniform(gl, prog) {
    setMatrixUniform(gl, prog.u_PMatrix, this.matrix);
  }
};