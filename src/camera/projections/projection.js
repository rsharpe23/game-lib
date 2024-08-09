import { setMatrixUniform } from '../../../lib/gl-utils.js';
import MatrixProvider from '../../core/matrix-provider.js';

export default class extends MatrixProvider {
  setMatrixUniform(gl, prog) {
    setMatrixUniform(gl, prog.u_PMatrix, this.matrix);
  }
};