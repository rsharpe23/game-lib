import { setMatUniform } from '../../core/gl-util';

export default class {
  constructor(matrix) { 
    this.matrix = matrix; 
  }

  setMatUniform(gl, prog) {
    setMatUniform(gl, prog.u_PMatrix, this.matrix);
  }
};