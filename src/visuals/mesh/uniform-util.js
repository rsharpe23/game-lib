import { mat4 } from '../../../lib/gl-matrix/index.js';
import { setMatUniform } from '../../core/gl-util.js';

// TODO: Порефакторить подобным образом класс Projection или попробовать 
// сразу сделать униформы и атрибуты программы такими объектами 

// class MatrixUniform {
//   matrix = mat4.create();

//   constructor(location) {
//     this.location = location;
//   }

//   set(gl) { 
//     setMatUniform(gl, this.location, this.matrix); 
//   }
// }

// TODO: Перенести в более подходящий раздел

class MatrixUniform {
  matrix = mat4.create();

  // Временный перенос location из констурктора 
  // в параметры, для удобства
  set(gl, location) { 
    setMatUniform(gl, location, this.matrix); 
  }
}

class ModelViewMatrixUniform extends MatrixUniform {
  set(gl, prog, viewMat, modelMat) {
    mat4.mul(this.matrix, viewMat, modelMat);
    super.set(gl, prog.u_MVMatrix);
  }
}

class NormalMatrixUniform extends MatrixUniform {
  set(gl, prog, mvMat) {
    mat4.invert(this.matrix, mvMat);
    mat4.transpose(this.matrix, this.matrix);
    super.set(gl, prog.u_NMatrix);
  }
}

const mvMatUniform = new ModelViewMatrixUniform();
const nMatUniform = new NormalMatrixUniform();

export const setMatUniforms = (gl, prog, camera, item) => {
  mvMatUniform.set(gl, prog, camera.viewMat, item.matrix);
  nMatUniform.set(gl, prog, mvMatUniform.matrix);
};