import { mat4 } from '../../../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../../../lib/gl-utils.js';

// Вычисление матрицы внутри свойства, как было в старой версии TRS, 
// не подходит в некоторых случаях, например как здесь. Это из-за того, что 
// расчёт будет выполняется в каждом из объектов, который это свойство вызывает, 
// а нужно чтобы он выполнялся только один раз за обновление, внутри камеры

export default class {
  matrix = mat4.create();

  apply(gl, prog) {
    this._calcMatrix(this.matrix);
    setMatrixUniform(gl, prog.u_PMatrix, this.matrix);
  }
};