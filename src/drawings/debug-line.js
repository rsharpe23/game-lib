import { setMatrixUniform, setAttribute 
} from '../../lib/gl-utils.js';

import { findNode } from '../node/index.js';
import Drawing from './drawing.js';

const positions = [0, 0, 0, 1, 0, 0, 0, 1];

const setPositionsUniform = (gl, prog, startPos, endPos) => {
  positions[0] = startPos[0];
  positions[1] = startPos[1];
  positions[2] = startPos[2];

  positions[4] = endPos[0];
  positions[5] = endPos[1];
  positions[6] = endPos[2];

  gl.uniform4fv(prog.u_Positions, positions);
};

export default class extends Drawing {
  color = [1, 1, 1, 1];

  constructor(name, startPos, endPos) {
    super(name, 'debug-line');
    this.startPos = startPos;
    this.endPos = endPos;
  }

  get _vpMatrix() {
    return this?._camera.vpMatrix;
  }

  get _indexBuffer() {
    return this.renderProps.indexBuffer;
  }

  _beforeUpdate(appProps) {
    this._camera = findNode(appProps.scene, '_Camera');
  }

  _update(appProps) {
    const gl = appProps.gl;

    const prog = this.prog;
    prog.use(gl);

    gl.uniform4fv(prog.u_Color, this.color);
    setPositionsUniform(gl, prog, this.startPos, this.endPos);
    setMatrixUniform(gl, prog.u_Matrix, this._vpMatrix);

    setAttribute(gl, prog.a_Index, this._indexBuffer, 1, gl.FLOAT);
    
    gl.drawArrays(gl.LINES, 0, 2);
  }
}