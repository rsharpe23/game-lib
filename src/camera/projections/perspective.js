import { mat4 } from '../../../lib/gl-matrix/index.js';
import Projection from './projection.js';

export default class extends Projection {
  constructor(fov, aspect, near, far) {
    super();
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
  }

  _calcMatrix(matrix) {
    mat4.perspective(matrix, 
      this.fov, this.aspect, this.near, this.far);
  }
}