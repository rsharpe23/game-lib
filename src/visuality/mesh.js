import Visuality from './visuality.js';
import { setAttribute, drawElements } from '../core/gl-api.js';
import { find } from '../../mixins/list-mixin.js';

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

export default class Mesh extends Visuality {
  constructor(name, trs, geometry) {
    super(name, trs);
    this.geometry = geometry;
  }

  // Переделать в метод, т.к. если поменять 
  // geometry, то items не изменятся
  get items() {
    if (!this._items) {
      this._items = Array.from(this.geometry);
    }

    return this._items;
  }

  _beforeUpdate() {
    for (const { trs } of this.items) {
      if (!trs.parent) trs.parent = this.trs;
    }
  }

  _update(appProps) {
    const store = appProps.store[this.geometry.accessor];

    for (const item of this.items) {
      const gl = appProps.gl;
      const prog = appProps.prog;
      const matrices = appProps.matrices;

      applyMvMatrix(gl, prog, matrices.view, item.trs.matrix);
      applyNormalMatrix(gl, prog);

      gl.uniform1i(prog.u_Sampler, 0);

      for (const prim of item.primitives) {
        setAttribute(gl, store, prog.a_Position, prim.vbo);
        setAttribute(gl, store, prog.a_Normal, prim.nbo);
        setAttribute(gl, store, prog.a_Texcoord, prim.tbo);
        drawElements(gl, store, prim.ibo);
      }
    }
  }
}

Object.assign(Mesh.prototype, { find });