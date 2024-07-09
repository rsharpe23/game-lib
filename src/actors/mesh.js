import Actor from './actor.js';
import { setAttribute, drawElements } from '../../lib/glu.js'

const { mat4 } = glMatrix;

const matrixStack = {
  items: [],

  push(matrix) {
    const temp = mat4.create();
    mat4.copy(temp, matrix);
    this.items.push(temp);
  },
  
  pop(matrix) {
    if (this.items.length > 0) {
      matrix.set(this.items.pop());
    }
  },  
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

  // Из-за лишней работы GC могут возникать фризы
  _render(appProps) {
    for (const node of this.nodes) {
      const gl = appProps.gl;
      const prog = appProps.prog;
      const matrices = appProps.matrices;
      const store = appProps.store[node.accessor];

      gl.uniform1i(prog.u_Sampler, 0);

      matrixStack.push(matrices.modelView);

      mat4.mul(matrices.modelView, matrices.modelView, node.trs.matrix);
      gl.uniformMatrix4fv(prog.u_MVMatrix, false, matrices.modelView);

      mat4.invert(matrices.normal, matrices.modelView);
      mat4.transpose(matrices.normal, matrices.normal);
      gl.uniformMatrix4fv(prog.u_NMatrix, false, matrices.normal);

      matrixStack.pop(matrices.modelView);

      for (const prim of node.primitives) {
        setAttribute(gl, store, prog.a_Position, prim.vbo);
        setAttribute(gl, store, prog.a_Normal, prim.nbo);
        setAttribute(gl, store, prog.a_Texcoord, prim.tbo);
        drawElements(gl, store, prim.ibo);
      }
    }
  }
}