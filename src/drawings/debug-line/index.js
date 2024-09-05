import { setMatrixUniform, setAttribute, createBuffer 
} from '../../../lib/gl-utils.js';

import { findChild } from '../../../lib/node-utils.js';
import Drawing from '../drawing.js';
import setPositionsUniform from './set-pos-uniform.js';

export default class extends Drawing {
  color = [1, 1, 1, 1];

  constructor(name, startPos, endPos) {
    super(name, 'debug-line');
    this.startPos = startPos;
    this.endPos = endPos;
  }

  _beforeUpdate({ gl, scene }) {
    this._indexBuffer = createBuffer(gl, 
      new Float32Array([0, 1]), gl.ARRAY_BUFFER);

    this._camera = findChild(scene, 'Camera');
  }

  _update(appProps) {
    const gl = appProps.gl;

    const prog = this.prog;
    prog.use(gl);

    setMatrixUniform(gl, prog.u_Matrix, this._camera.vpMatrix);
    setPositionsUniform(gl, prog, this.startPos, this.endPos);

    gl.uniform4fv(prog.u_Color, this.color);

    setAttribute(gl, prog.a_Index, this._indexBuffer, 1, gl.FLOAT);

    gl.drawArrays(gl.LINES, 0, 2);
  }
}