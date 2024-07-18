import { passTexture, passAttribute, drawElements 
  } from '../../core/gl-util.js';

import MeshBase from './mesh-base.js';
import matrixPasser from './matrix-passer.js';

export default class extends MeshBase {
  _beforeUpdate() {
    for (const { trs } of this.items) {
      if (!trs.parent) trs.parent = this.trs;
    }
  }

  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const camera = appProps.updatable.camera;

    const texture = appProps.store.get(this.texImg);
    const geomStore = appProps.store.get(this.geometry);

    passTexture(gl, prog.u_Sampler, texture);
    
    for (const item of this.items) {
      matrixPasser.passMatrices(gl, prog, camera, item);

      for (const primitive of item.primitives) {
        passAttribute(gl, geomStore, prog.a_Position, primitive.vbo);
        passAttribute(gl, geomStore, prog.a_Normal, primitive.nbo);
        passAttribute(gl, geomStore, prog.a_Texcoord, primitive.tbo);
        drawElements(gl, geomStore, primitive.ibo);
      }
    }
  }
}