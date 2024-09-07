import { setTextureUniform } from '../../../lib/gl-utils.js'; 
import Object3D from './object3d.js';

// Это не абстрактный класс, а просто базовый класс меша 
// объект которого можно создать, поскольку он реализует _update().

export default class extends Object3D {
  constructor(name, trs, texImg) {
    super(name, 'mesh', trs);
    this.texImg = texImg;
  }

  _update(appProps) {
    super._update(appProps);

    if (!this.texImg) return;
    
    setTextureUniform(appProps.gl, appProps.prog.u_Sampler, 
      appProps.store.get(this.texImg));
  }
}