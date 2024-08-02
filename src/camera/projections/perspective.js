import { mat4 } from '../../../lib/gl-matrix';
import Projection from './projection';

export default class extends Projection {
  fov = 1.04;
  aspect = 1;
  near = 0.1;
  far = 1000;

  constructor() {
    super(mat4.create());
  }

  setMatUniform(gl, prog) {
    mat4.perspective(this.matrix, this.fov, this.aspect, 
      this.near, this.far);
      
    super.setMatUniform(gl, prog);
  }
};