import { setTextureUniform } from '../../../lib/gl-utils.js';
import Drawing from '../drawing.js';
import ItemList from './item-list.js';
import { setMatrixUniforms } from './uniform-utils.js';
import { setAttribute, drawElements } from './gl-utils.js';

export default class extends Drawing {
  constructor(name, trs, texImg, geometry) {
    super(name);
    this.trs = trs;
    this.texImg = texImg;
    this.geometry = geometry;
    this.items = new ItemList(geometry); 
    this._setParentForRootItems();
  }

  findItem(name) {
    return this.items.find(item => item.name === name);
  }

  _setParentForRootItems() {
    for (const { trs } of this.items) {
      if (!trs.parent) trs.setParent(this.trs);
    }
  }
  
  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const camera = appProps.scene.camera;
  
    const texture = appProps.store.get(this.texImg);
    const gStore = appProps.store.get(this.geometry);

    setTextureUniform(gl, prog.u_Sampler, texture);

    for (const item of this.items) {
      setMatrixUniforms(gl, prog, item, camera);

      for (const primitive of item.primitives) {
        setAttribute(gl, gStore, prog.a_Position, primitive.vbo);
        setAttribute(gl, gStore, prog.a_Normal, primitive.nbo);
        setAttribute(gl, gStore, prog.a_Texcoord, primitive.tbo);

        // Чтобы реализовать каркасную сетку (wireframe), 
        // нужно задать режим отрисовки LINE_STRIP
        drawElements(gl, gStore, primitive.ibo);
      }
    }
  }

}