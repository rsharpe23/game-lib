import Updatable from "./updatable.js";

const { mat4 } = glMatrix;

export class Perspective {
  constructor(fov, aspect, near, far) {
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
  }
  
  applyMatrix(gl, prog, matrix) {
    mat4.perspective(matrix, this.fov, this.aspect, this.near, this.far);
    gl.uniformMatrix4fv(prog.u_PMatrix, false, matrix);
  }
}

export default class extends Updatable {
  lookAtPoint = [0, 0, 0];

  constructor(position, projection) {
    super();
    this.position = position;
    this.projection = projection;
  }

  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const matrices = appProps.matrices;

    // Возможно лучше перенести матрицу проекции в класс Perspective
    this.projection.applyMatrix(gl, prog, matrices.projection);

    mat4.lookAt(matrices.view, this.position, 
      this.lookAtPoint, [0, 1, 0]);
  }
};