import { setTextureUniform } from '../../../lib/gl-utils.js';
import Visual from '../visual.js';
import ItemList from './item-list.js';
import { setMatrixUniforms } from './uniform-util.js';
import { setAttribute, drawElements } from './utils.js';

export default class extends Visual {
  constructor(name, trs, texImg, geometry) {
    super(name, trs);
    this.texImg = texImg;
    this.items = new ItemList(geometry);
  }

  get geometry() {
    return this.items.geometry;
  }

  findItem(name) {
    return this.items.find(item => item.name === name);
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
  
    const texture = appProps.store.get(this.texImg);
    const geomStore = appProps.store.get(this.geometry);
  
    setTextureUniform(gl, prog.u_Sampler, texture);
    
    for (const item of this.items) {
      setMatrixUniforms(gl, prog, item, camera);
  
      for (const primitive of item.primitives) {
        setAttribute(gl, geomStore, prog.a_Position, primitive.vbo);
        setAttribute(gl, geomStore, prog.a_Normal, primitive.nbo);
        setAttribute(gl, geomStore, prog.a_Texcoord, primitive.tbo);
        drawElements(gl, geomStore, primitive.ibo);
      }
    }
  }

}