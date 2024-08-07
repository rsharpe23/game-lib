import { mat4 } from '../../lib/gl-matrix/index.js';

// Подумать, возможно и здесь можно использовать 
// MatrixProvider с оптимизацией

// item (model), view, projection - это всё MatrixProvider'ы

export const calcMvMatrix = (out, modelMat, viewMat) => 
  mat4.mul(out, viewMat, modelMat);

export const calcNormalMatrix = (out, mvMat) => {
  mat4.invert(out, mvMat);
  mat4.transpose(out, out);
};

export const calcMvpMatrix = (out, modelMat, viewMat, projMat) => {
  calcMvMatrix(out, modelMat, viewMat);
  mat4.mul(out, projMat, out);
};
