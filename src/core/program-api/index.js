import { createProgram as gluCreateProgram } from '../../../lib/gl-utils.js';
import Program from './program.js';

const _createProgram = (gl, glProg, locationData) => {
  const prog = new Program(glProg);
  prog.setLocations(gl, locationData);
  return prog;
};

export const createProgram = (gl, shaders) => {
  const locationData = shaders.map(shader => shader.parse()).flat();

  const [vs, fs] = shaders;
  const glProg = gluCreateProgram(gl, vs(gl, gl.VERTEX_SHADER), 
    fs(gl, gl.FRAGMENT_SHADER));

  return _createProgram(gl, glProg, locationData);
};

export { Program };