export default class {
  constructor(matrix) {
    this.matrix = matrix;
  }

  applyMatrix(gl, prog) {
    gl.uniformMatrix4fv(prog.u_PMatrix, false, this.matrix);
  }
};