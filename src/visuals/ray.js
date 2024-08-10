import { mat4 } from '../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../lib/gl-utils.js';
import { createProgram } from '../core/program-api/index.js';
import { Shader } from '../core/shader-api/index.js';
import Visual from './visual.js';

const matrix = mat4.create();
const shaders = [
  new Shader(`
    attribute float a_Index;

    uniform vec4 u_Positions[2];
    uniform mat4 u_Matrix;

    void main() {
      vec4 position = u_Positions[int(a_Index)];
      gl_Position = u_Matrix * position;
    }
  `),

  new Shader(`
    uniform mediump vec4 u_Color;

    void main() {
      gl_FragColor = u_Color;
    }
  `),
];

// Вместо Ray можно назвать DebugLine
export default class extends Visual {
  constructor(name, trs) {
    super(name, trs);
    this.renderProps.prog = true;
  }

  _beforeUpdate({ gl }) {
    const { renderProps } = this;
    renderProps.prog = createProgram(gl, shaders);
    renderProps.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, renderProps.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 1]), gl.STATIC_DRAW);
  }

  _update(appProps) {
    const gl = appProps.gl;
    const camera = appProps.updatable.camera;
    const prog = this.prog;

    prog.use(gl);

    mat4.mul(matrix, camera.viewMat, this.trs.matrix);
    mat4.mul(matrix, camera.projMat, matrix);
    setMatrixUniform(gl, prog.u_Matrix, matrix);

    // TODO: Доб. 3 свойства: color, startPos, endPos и сеттеры, 
    // которые вместо присваивания будут переназначать их элементы
    gl.uniform4fv(prog.u_Color, [1, 1, 1, 1]);
    gl.uniform4fv(prog.u_Positions, [0, 3, 0, 1, 2, 3, 0, 1]);

    const attr = prog.a_Index;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderProps.buffer);
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 1, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINES, 0, 2);
  }
}