import { mat4 } from '../../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../../lib/gl-utils.js';
import { calcMvMatrix, calcNormalMatrix } from '../../core/matrix-utils.js';

const mvMat = mat4.create();
const normalMat = mat4.create();

const setNormalMatrixUniform = (gl, prog) => {
  calcNormalMatrix(normalMat, mvMat);
  setMatrixUniform(gl, prog.u_NMatrix, normalMat);
};

export const setMatrixUniforms = (gl, prog, item, camera) => {
  calcMvMatrix(mvMat, item.matrix, camera.viewMat);
  setMatrixUniform(gl, prog.u_MVMatrix, mvMat);
  setNormalMatrixUniform(gl, prog);
};