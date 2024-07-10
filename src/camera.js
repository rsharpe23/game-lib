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

export default class {
  lookAtPoint = [0, 0, 0];

  constructor(position, projection) {
    this.position = position;
    this.projection = projection;
  }

  apply(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const matrices = appProps.matrices;

    this.projection.applyMatrix(gl, prog, matrices.projection);
    mat4.lookAt(matrices.view, this.position, 
      this.lookAtPoint, [0, 1, 0]);
  }
};