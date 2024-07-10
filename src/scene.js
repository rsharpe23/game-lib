import SceneBase from '../src/scene-base.js';

const applyMaterialColors = (gl, prog) => {
  gl.uniform3f(prog.u_MaterialAmbientColor, 0.2, 0.2, 0.2);
  gl.uniform3f(prog.u_MaterialSpecularColor, 0.8, 0.8, 0.8);
};

export default class extends SceneBase {
  constructor(texAtlas, camera, light) {
    super(camera, light);
    this.texAtlas = texAtlas;
  }

  _beforeRender({ gl, prog }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
      gl.UNSIGNED_BYTE, this.texAtlas);
    gl.generateMipmap(gl.TEXTURE_2D);

    prog.setLocations(gl);
  }

  _render(appProps) {
    const gl =  appProps.gl;
    const prog =  appProps.prog;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    prog.use(gl);

    this.camera.apply(appProps);
    this.light.apply(appProps);

    applyMaterialColors(gl, prog);
  }
};