import { mat4 } from '../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../lib/gl-utils.js';
import { createProgram } from '../core/program-api/index.js';
import { Shader } from '../core/shader-api/index.js';
import Visual from './visual.js';

const matrix = mat4.create();
const color = [1, 1, 1, 1];

// TODO: Попробовать просто передавать две точку сразу в вершинный 
// буфер и строить по ним линию без использования матриц

// Вместо Ray можно назвать DebugLine

const shaders = [
  new Shader(`
    attribute vec4 a_Position;
    uniform mat4 u_Matrix;

    void main() {
      gl_Position = u_Matrix * a_Position;
    }
  `),

  new Shader(`
    uniform mediump vec4 u_Color;

    void main() {
      gl_FragColor = u_Color;
    }
  `),
];

export default class extends Visual {
  constructor(name, trs) {
    super(name, trs);
    this.renderProps.prog = true;
  }

  _beforeUpdate({ gl }) {
    // TODO: Попробовать сделать так, чтобы в буфер 
    // сразу попадали нужны координаты

    const { renderProps } = this;
    renderProps.prog = createProgram(gl, shaders);
    renderProps.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, renderProps.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, 
      new Float32Array([0, 0, 0, 1, 0, 0]), gl.STATIC_DRAW);
  }

  _update(appProps) {
    const gl = appProps.gl;
    const camera = appProps.updatable.camera;

    this.prog.use(gl);

    mat4.mul(matrix, camera.viewMat, this.trs.matrix);
    mat4.mul(matrix, camera.projMat, matrix);
    setMatrixUniform(gl, this.prog.u_Matrix, matrix);

    gl.uniform4fv(this.prog.u_Color, color);

    const attr = this.prog.a_Position;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderProps.vbo);
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);

    // gl.lineWidth(4);
    gl.drawArrays(gl.LINES, 0, 2);
  }
}