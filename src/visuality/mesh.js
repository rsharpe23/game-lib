import Visuality from './visuality.js';
import { setAttribute, drawElements } from '../core/gl-utils.js';
import { find } from '../../mixins/list-mixin.js';

const { mat4 } = glMatrix;

export default class Mesh extends Visuality {
  // Это неправильно, т.к. матрицы используются сразу для 
  // всех нодов поочередно. По хорошему, у каждого 
  // нода должны быть свои mvMat и normalMat
  mvMat = mat4.create();
  normalMat = mat4.create();

  constructor(name, trs, geometry) {
    super(name, trs);
    this.setGeometry(geometry);
  }

  get items() {
    return this._items ??= Array.from(this.geometry);
  }

  setGeometry(value) {
    if (this.geometry === value) return;
    this.geometry = value;
    this._items = null; 
  }

  _applyMvMatrix(gl, prog, viewMat, modelMat) {
    mat4.mul(this.mvMat, viewMat, modelMat);
    gl.uniformMatrix4fv(prog.u_MVMatrix, false, this.mvMat);
  }

  _applyNormalMatrix(gl, prog) {
    mat4.invert(this.normalMat, this.mvMat);
    mat4.transpose(this.normalMat, this.normalMat);
    gl.uniformMatrix4fv(prog.u_NMatrix, false, this.normalMat);
  }

  _beforeUpdate() {
    for (const { trs } of this.items) {
      if (!trs.parent) trs.parent = this.trs;
    }
  }

  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const camera = appProps.updatable.camera;
    const store = appProps.store[this.geometry.id];

    for (const item of this.items) {
      this._applyMvMatrix(gl, prog, camera.viewMat, item.trs.matrix);
      this._applyNormalMatrix(gl, prog);

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