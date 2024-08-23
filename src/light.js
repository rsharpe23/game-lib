import { vec3 } from '../lib/gl-matrix/index.js';
import Node, { findNode } from './node/index.js';

const setColorUniforms = (gl, prog, colors) => {
  gl.uniform4fv(prog.u_AmbientColor, colors.ambient);
  gl.uniform4fv(prog.u_DiffuseColor, colors.diffuse);
  gl.uniform4fv(prog.u_SpecularColor, colors.specular);
};

export default class extends Node {
  // Должно быть открытым, т.к. может понадобиться в других нодах
  relativePos = vec3.create();  

  colors = {
    ambient: [0.4, 0.4, 0.4, 1],
    diffuse: [0.8, 0.8, 0.8, 1],
    specular: [1, 1, 1, 1],
  };

  constructor(name, position) {
    super(name, 'light');
    this.position = position;
  }

  _beforeUpdate(appProps) {
    this._camera = findNode(appProps.scene, '_Camera');
  }

  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;

    // TODO: Можно вынести это в шейдер, а u_LightingPos задавать обычным position
    // Но в этом случае relativePos будет вычисляться в каждом вершине, каждого объекта
    vec3.transformMat4(this.relativePos, this.position, 
      this._camera.viewMat);

    gl.uniform3fv(prog.u_LightingPos, this.relativePos);

    setColorUniforms(gl, prog, this.colors);
  }

  
}
