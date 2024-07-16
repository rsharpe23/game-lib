const { mat4 } = glMatrix;

export default {
  mvMat: mat4.create(),
  normalMat: mat4.create(),

  applyMatrices(gl, prog, camera, item) {
    this.applyMvMatrix(gl, prog, camera.viewMat, item.matrix);
    this.applyNormalMatrix(gl, prog);
  },

  applyMvMatrix(gl, prog, viewMat, modelMat) {
    mat4.mul(this.mvMat, viewMat, modelMat);
    gl.uniformMatrix4fv(prog.u_MVMatrix, false, this.mvMat);
  },

  applyNormalMatrix(gl, prog) {
    mat4.invert(this.normalMat, this.mvMat);
    mat4.transpose(this.normalMat, this.normalMat);
    gl.uniformMatrix4fv(prog.u_NMatrix, false, this.normalMat);
  },
}