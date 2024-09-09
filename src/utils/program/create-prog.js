import { createProgram } from '../../../lib/gl-utils.js';
import Program from './default.js';

// Подобно create-prog.js можно также сделать create-scene.js 
// в одной папке со сценой и create-mesh.js в папке с мешом 

const create = (gl, glProg, data) => {
  const prog = new Program(glProg);
  prog.setLocations(gl, data);
  return prog;
};

export default (gl, shaders) => {
  const data = shaders.map(shader => shader.parse()).flat();

  const [vs, fs] = shaders;
  const glProg = createProgram(gl, vs(gl, gl.VERTEX_SHADER), 
    fs(gl, gl.FRAGMENT_SHADER));

  return create(gl, glProg, data);
};