import Node from './node.js';

const setMaterialUniforms = (gl, prog) => {
  gl.uniform4f(prog.u_MaterialAmbientColor, 0.4, 0.4, 0.4, 1);
  gl.uniform4f(prog.u_MaterialSpecularColor, 1, 1, 1, 1);
};

export default class extends Node {
  _beforeUpdate({ gl }) {
    gl.clearColor(0.7, 0.71, 0.72, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  _update(appProps) {
    const gl = appProps.gl;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Пока что общая концепция заключается в одном материале 
    // для всех мешей, но с разными текстурами. Меши без текстуры 
    // использоваться не могут.

    // Общая программа в appProps реализована потому, 
    // что её используют также камера и свет

    setMaterialUniforms(gl, appProps.prog); // общий материал
  }
}