import { mat4 } from '../../lib/gl-matrix/index.js';
import { setMatrixUniform, setAttribute } from '../../lib/gl-utils.js';
import Visual from './visual.js';

const viewProjMat = mat4.create();
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

export default class extends Visual {
  color = [1, 1, 1, 1];

  constructor(name, startPos, endPos) {
    super(name);
    this.startPos = startPos;
    this.endPos = endPos;
  }

  get indexBuffer() {
    return this.renderProps.indexBuffer;
  }

  _update(appProps) {
    const gl = appProps.gl;
    const camera = appProps.updatable.camera;
    const prog = this.prog;

    prog.use(gl);

    mat4.mul(viewProjMat, camera.projMat, camera.viewMat);
    setMatrixUniform(gl, prog.u_Matrix, viewProjMat);

    gl.uniform4fv(prog.u_Color, this.color);
    setPositionsUniform(gl, prog, this.startPos, this.endPos);

    setAttribute(gl, prog.a_Index, this.indexBuffer, 1, gl.FLOAT);
    gl.drawArrays(gl.LINES, 0, 2);
  }
}