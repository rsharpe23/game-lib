import { createProgram as gluCreateProgram } from '../gl-util.js';
import Program from './program.js';

export const createProgram = (gl, glProg, locations) => {
  const prog = new Program(glProg);
  prog.setLocationProps(gl, locations);
  return prog;
};

export const createProgramBy = (gl, shaders) => {
  const [s1, s2] = shaders;
  const glProg = gluCreateProgram(gl, s1(gl, gl.VERTEX_SHADER), 
    s2(gl, gl.FRAGMENT_SHADER));

  const locations = shaders.map(shader => shader.parse()).flat();

  return createProgram(gl, glProg, locations);
};