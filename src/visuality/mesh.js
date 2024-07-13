import Visuality from './visuality.js';
import { setAttribute, drawElements } from '../core/gl-utils.js';
import { find } from '../../mixins/list-mixin.js';

const { mat4 } = glMatrix;

export default class Mesh extends Visuality {
  mvMat = mat4.create();
  normalMat = mat4.create();

  constructor(name, trs, geometry) {
    super(name, trs);
    this.setGeometry(geometry);
  }

  get items() {
    if (!this._items || this._items.needsUpdate) {
      this._items = Array.from(this.geometry);
      this._items.needsUpdate = false;
      console.log('!!!');
    }

    return this._items;
  }

  setGeometry(value) {
    this.geometry = value;
    // BUG: Сначала создается _items, затем его св-во needsUpdate 
    // тут же перезаписывается в true, из-за этого получается двойное определение 
    this.items.needsUpdate = true;  
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

    gl.uniform1i(prog.u_Sampler, 0);

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