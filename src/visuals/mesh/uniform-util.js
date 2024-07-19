import { setMatUniform } from '../../core/gl-util.js';

const { mat4 } = glMatrix;

export default {
  mvMat: mat4.create(),
  normalMat: mat4.create(),

  setMatUniforms(gl, prog, camera, item) {
    this.setMvMatUniform(gl, prog, camera.viewMat, item.matrix);
    this.setNormalMatUniform(gl, prog);
  },

  setMvMatUniform(gl, prog, viewMat, modelMat) {
    mat4.mul(this.mvMat, viewMat, modelMat);
    setMatUniform(gl, prog.u_MVMatrix, this.mvMat);
  },

  setNormalMatUniform(gl, prog) {
    mat4.invert(this.normalMat, this.mvMat);
    mat4.transpose(this.normalMat, this.normalMat);
    setMatUniform(gl, prog.u_NMatrix, this.normalMat);
  },
}