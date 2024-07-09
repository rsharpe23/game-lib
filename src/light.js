const { vec3 } = glMatrix;

export default {
  _position: vec3.create(),
  position: [0, 0, 0],

  colors: {
    ambient: [0.4, 0.4, 0.4],
    diffuse: [0.8, 0.8, 0.8],
    specular: [1, 1, 1],

    apply(gl, prog) {
      gl.uniform3fv(prog.u_AmbientColor, this.ambient);
      gl.uniform3fv(prog.u_DiffuseColor, this.diffuse);
      gl.uniform3fv(prog.u_SpecularColor, this.specular);
    },
  },

  apply(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const matrices = appProps.matrices;

    vec3.transformMat4(this._position, this.position, matrices.modelView);
    gl.uniform3fv(prog.u_LightingPos, this._position);

    this.colors.apply(gl, prog);
  }
}