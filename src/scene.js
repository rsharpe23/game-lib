import Node from './node/index.js';

const setMaterialUniforms = (gl, prog) => {
  gl.uniform4f(prog.u_MaterialAmbientColor, 0.4, 0.4, 0.4, 1);
  gl.uniform4f(prog.u_MaterialSpecularColor, 1, 1, 1, 1);
};

// Если закешировать камеру и свет в сцене, то можно предполагать 
// что она всегда их будет иметь, но это неверно, т.к. камеру и свет
// можно удалить через removeChild, как и любой другой нод

// Сортировку children можно делегировать drawing'ам, 
// чтобы каждый сам решал как ему добавляться

export default class extends Node {
  constructor(name) {
    super(name, 'scene');
  }

  _beforeUpdate({ gl }) {
    gl.clearColor(0.7, 0.71, 0.72, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  _update(appProps) {
    const gl =  appProps.gl;
    const prog = appProps.prog;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    prog.use(gl);

    // Установка общего материала для всех мешей
    setMaterialUniforms(gl, prog);
  }
}