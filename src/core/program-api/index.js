import { createProgram as gluCreateProgram } from '../gl-util';
import Program from './program';

const program = (gl, glProg, locations) => {
  const prog = new Program(glProg);
  prog.setLocationProps(gl, locations);
  return prog;
};

export const createProgram = (gl, shaders) => {
  const locations = shaders.map(shader => shader.parse()).flat();

  const [vs, fs] = shaders;
  const glProg = gluCreateProgram(gl, vs(gl, gl.VERTEX_SHADER), 
    fs(gl, gl.FRAGMENT_SHADER));

  return program(gl, glProg, locations);
};

export { Program };