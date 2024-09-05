import { setTextureUniform } from '../../lib/gl-utils.js'; 
import MeshBase from './mesh-base.js';

export default class extends MeshBase {
  constructor(name, trs, texImg) {
    super(name, trs);
    this.texImg = texImg;
  }

  _update(appProps) {
    super._update(appProps);

    if (!this.texImg) return;
    
    setTextureUniform(appProps.gl, appProps.prog.u_Sampler, 
      appProps.store.get(this.texImg));
  }
}