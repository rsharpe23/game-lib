const { vec3 } = glMatrix;
const position = vec3.create();

const applyColors = (gl, prog, colors) => {
  gl.uniform3fv(prog.u_AmbientColor, colors.ambient);
  gl.uniform3fv(prog.u_DiffuseColor, colors.diffuse);
  gl.uniform3fv(prog.u_SpecularColor, colors.specular);
};

export default class {
  colors = {
    ambient: [0.4, 0.4, 0.4],
    diffuse: [0.8, 0.8, 0.8],
    specular: [1, 1, 1],
  };

  constructor(position) {
    this.position = position;
  }

  apply(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const matrices = appProps.matrices;

    vec3.transformMat4(position, this.position, matrices.view);
    gl.uniform3fv(prog.u_LightingPos, position);

    applyColors(gl, prog, this.colors);
  }
};