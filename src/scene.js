import SceneBase from './scene-base.js';

const applyMaterialColors = (gl, prog) => {
  gl.uniform3f(prog.u_MaterialAmbientColor, 0.2, 0.2, 0.2);
  gl.uniform3f(prog.u_MaterialSpecularColor, 0.8, 0.8, 0.8);
};

export default class extends SceneBase {
  constructor(texAtlas, camera, light) {
    super(camera, light);
    this.texAtlas = texAtlas;
  }

  _beforeUpdate({ gl, prog }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // TODO: Вынести в drawing
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
      gl.UNSIGNED_BYTE, this.texAtlas);
    gl.generateMipmap(gl.TEXTURE_2D);

    // TODO: Также вынести в drawing
    // prog.setLocations(gl);
  }

  _update(appProps) {
    const gl =  appProps.gl;
    const prog = appProps.prog;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // TODO: Добавить проверку и вынести в drawing, т.к. если 
    // использовать отдельную программу одного из drawing'а, то она 
    // перебьет дефолтную для всех последующий drawing'ов. В этом случае 
    // следующий drawing, который не имеет своей программы, должен 
    // переключить программу на дефолтную
    prog.use();

    // Семплер должен устанавливаться в том же месте, где и useProgram
    gl.uniform1i(prog.u_Sampler, 0);

    applyMaterialColors(gl, prog);
  }
};