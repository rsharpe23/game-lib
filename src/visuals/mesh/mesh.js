import { setAttribute, drawElements } from '../../core/gl-utils.js';
import MeshBase from './mesh-base.js';
import ItemList from './item-list.js';
import matApplicator from './matrix-applicator.js';

export default class extends MeshBase {
  constructor(name, trs, geometry) {
    super(name, trs, new ItemList(geometry));
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
    const store = appProps.store.get(this.geometry);

    gl.uniform1i(prog.u_Sampler, 0);

    for (const item of this.items) {
      matApplicator.applyMatrices(gl, prog, camera, item);

      for (const primitive of item.primitives) {
        setAttribute(gl, store, prog.a_Position, primitive.vbo);
        setAttribute(gl, store, prog.a_Normal, primitive.nbo);
        setAttribute(gl, store, prog.a_Texcoord, primitive.tbo);
        drawElements(gl, store, primitive.ibo);
      }
    }
  }
}