import Actor from './actor.js';
import { setAttribute, drawElements } from '../../lib/glu.js'

const { mat4 } = glMatrix;
const mvMatrix = mat4.create();
const normalMatrix = mat4.create();

const applyMvMatrix = (gl, prog, viewMatrix, modelMatrix) => {
  mat4.mul(mvMatrix, viewMatrix, modelMatrix);
  gl.uniformMatrix4fv(prog.u_MVMatrix, false, mvMatrix);
};

const applyNormalMatrix = (gl, prog) => {
  mat4.invert(normalMatrix, mvMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  gl.uniformMatrix4fv(prog.u_NMatrix, false, normalMatrix);
};

export default class extends Actor {
  constructor(name, trs, nodes) {
    super(name, trs);
    this.nodes = nodes;
  }

  findNode(name) {
    return this.nodes.find(node => node.name === name);
  }

  _beforeRender() {
    for (const { trs } of this.nodes) {
      if (!trs.parent) trs.parent = this.trs;
    }
  }

  _render(appProps) {
    for (const node of this.nodes) {
      const gl = appProps.gl;
      const prog = appProps.prog;
      const matrices = appProps.matrices;
      const store = appProps.store[node.accessor];

      gl.uniform1i(prog.u_Sampler, 0);

      applyMvMatrix(gl, prog, matrices.view, node.trs.matrix);
      applyNormalMatrix(gl, prog);

      for (const prim of node.primitives) {
        setAttribute(gl, store, prog.a_Position, prim.vbo);
        setAttribute(gl, store, prog.a_Normal, prim.nbo);
        setAttribute(gl, store, prog.a_Texcoord, prim.tbo);
        drawElements(gl, store, prim.ibo);
      }
    }
  }
};