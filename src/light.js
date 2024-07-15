import Updatable from "./updatable.js";

const { vec3 } = glMatrix;
const worldPos = vec3.create();

const applyColors = (gl, prog, colors) => {
  gl.uniform3fv(prog.u_AmbientColor, colors.ambient);
  gl.uniform3fv(prog.u_DiffuseColor, colors.diffuse);
  gl.uniform3fv(prog.u_SpecularColor, colors.specular);
};

export default class extends Updatable {
  colors = {
    ambient: [0.4, 0.4, 0.4],
    diffuse: [0.8, 0.8, 0.8],
    specular: [1, 1, 1],
  };

  constructor(position) {
    super();
    this.position = position;
  }

  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const camera = appProps.updatable.camera;

    vec3.transformMat4(worldPos, this.position, camera.viewMat);
    gl.uniform3fv(prog.u_LightingPos, worldPos);

    applyColors(gl, prog, this.colors);
  }
};