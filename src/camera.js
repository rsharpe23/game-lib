const { mat4 } = glMatrix;

export default {
  position: [0, 0, 0],
  target: [0, 0, 0],

  perspective: {
    fov: 1.04,
    aspect: 0,
    near: 0.1,
    far: 1000,

    apply(gl, prog, matrix) {
      mat4.perspective(matrix, this.fov, this.aspect, this.near, this.far);
      gl.uniformMatrix4fv(prog.u_PMatrix, false, matrix);
    },
  },

  apply(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const matrices = appProps.matrices;
    this.perspective.apply(gl, prog, matrices.projection);
    mat4.lookAt(matrices.modelView, this.position, this.target, [0, 1, 0]);
  }
};