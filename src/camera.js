const { mat4 } = glMatrix;

const applyProjMatrix = (gl, prog, matrix, opts) => {
  mat4.perspective(matrix, opts.fov, opts.aspect, opts.near, opts.far);
  gl.uniformMatrix4fv(prog.u_PMatrix, false, matrix);
};

export default class {
  defaultPerspectiveOpts = {
    fov: 1.04,
    near: 0.1,
    far: 1000,
  };

  constructor(perspectiveOpts, position, lookPoint) {

    this.perspectiveOpts = { 
      ...this.defaultPerspectiveOpts, 
      ...perspectiveOpts 
    };

    this.position = position ?? [0, 0, 0];
    this.lookPoint = lookPoint ?? [0, 0, 0];
  }

  apply(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const matrices = appProps.matrices;

    applyProjMatrix(gl, prog, matrices.projection, 
      this.perspectiveOpts);

    mat4.lookAt(matrices.view, this.position, 
      this.lookPoint, [0, 1, 0]);
  }
};