import { mat4 } from '../../lib/gl-matrix/index.js';

// Этот файл можно переименовать на calc-utils.js в контексте matrix-api

// Также, вокруг gl-matrix можно создать 3 обертки: matrix, quaternion и vector
// Они могут быть частью общей библиотеки math. Например:

// import { Matrix } from './math.js';
// const mat = new Matrix(glMatrix.mat4.create() или []);
// const mat2 = mat.mul(mat1);

export const calcNormalMatrix = (out, mvMatrix) => {
  mat4.invert(out, mvMatrix);
  mat4.transpose(out, out);
};