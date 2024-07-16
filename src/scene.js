import SceneBase from './scene-base.js';

const applyMaterialColors = (gl, prog) => {
  gl.uniform3f(prog.u_MaterialAmbientColor, 0.2, 0.2, 0.2);
  gl.uniform3f(prog.u_MaterialSpecularColor, 1.0, 1.0, 1.0);
};

export default class extends SceneBase {
  constructor(texAtlas, camera, light) {
    super(camera, light);
    this.texAtlas = texAtlas;
  }

  _beforeUpdate({ gl }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // TODO: Перенести в Mesh
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
      gl.UNSIGNED_BYTE, this.texAtlas);
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  _update(appProps) {
    const gl =  appProps.gl;
    const prog = appProps.prog;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Можно сделать отдельную ф-цию в glu
    const currentProg = gl.getParameter(gl.CURRENT_PROGRAM);
    if (prog !== currentProg) {
      gl.useProgram(prog);
    }

    applyMaterialColors(gl, prog);
  }
}