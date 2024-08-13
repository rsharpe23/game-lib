import { mat4 } from '../../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../../lib/gl-utils.js';
import { calcNormalMatrix } from '../../core/matrix-utils.js';

const modelViewMat = mat4.create();
const normalMat = mat4.create();

const setNormalMatrixUniform = (gl, prog) => {
  calcNormalMatrix(normalMat, modelViewMat);
  setMatrixUniform(gl, prog.u_NMatrix, normalMat);
};

export const setMatrixUniforms = (gl, prog, item, camera) => {
  mat4.mul(modelViewMat, camera.viewMat, item.matrix);
  setMatrixUniform(gl, prog.u_MVMatrix, modelViewMat);
  setNormalMatrixUniform(gl, prog);
};