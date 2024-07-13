import Projection from './projection.js';

const { mat4 } = glMatrix;

export default class extends Projection {
  fov = 1.04;
  aspect = 1;
  near = 0.1;
  far = 1000;

  constructor() {
    super(mat4.create());
  }

  applyMatrix(gl, prog) {
    mat4.perspective(this.matrix, this.fov, this.aspect, 
      this.near, this.far);
      
    super.applyMatrix(gl, prog);
  }
};