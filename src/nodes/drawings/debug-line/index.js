import { setMatrixUniform, setAttribute } from '../../../../lib/gl-utils.js';
import Drawing from '../drawing.js';
import setPositionsUniform from './utils/set-pos-uniform.js';
import createBuffer from './utils/create-buffer.js';

export default class extends Drawing {
  color = [1, 1, 1, 1];

  constructor(name, startPos, endPos) {
    super(name, 'debug-line');
    this.startPos = startPos;
    this.endPos = endPos;
  }

  _beforeUpdate({ gl, scene }) {
    this._buffer = createBuffer(gl);
    this._camera = scene.findChild('Camera');
  }

  _update(appProps) {
    const gl = appProps.gl;
    const prog = this.prog;

    setMatrixUniform(gl, prog.u_Matrix, this._camera.vpMatrix);
    setPositionsUniform(gl, prog, this.startPos, this.endPos);
    gl.uniform4fv(prog.u_Color, this.color);

    setAttribute(gl, prog.a_Index, this._buffer);
    gl.drawArrays(gl.LINES, 0, 2);
  }
}