import { vec3 } from '../lib/gl-matrix/index.js';
import Node from './node.js';

const setColorUniforms = (gl, prog, colors) => {
  gl.uniform4fv(prog.u_AmbientColor, colors.ambient);
  gl.uniform4fv(prog.u_DiffuseColor, colors.diffuse);
  gl.uniform4fv(prog.u_SpecularColor, colors.specular);
};

export default class extends Node {
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

  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const camera = appProps.scene.camera;

    vec3.transformMat4(this.relativePos, this.position, camera.viewMat);
    gl.uniform3fv(prog.u_LightingPos, this.relativePos);

    setColorUniforms(gl, prog, this.colors);
  }
}