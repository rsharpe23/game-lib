import SceneBase from './scene-base';
import { useProgram } from './core/gl-util';

const setMaterialUniforms = (gl, prog) => {
  gl.uniform3f(prog.u_MaterialAmbientColor, 0.4, 0.4, 0.4);
  gl.uniform3f(prog.u_MaterialSpecularColor, 1.0, 1.0, 1.0);
};

export default class extends SceneBase {
  _beforeUpdate({ gl }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  _update(appProps) {
    const gl =  appProps.gl;
    const prog = appProps.prog;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    useProgram(gl, prog);
    setMaterialUniforms(gl, prog);
  }
}