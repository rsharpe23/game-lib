import { createProgram as gluCreateProgram } from './gl-util.js';

const program = (gl, prog) => {
  return {
    glProg: prog,

    a_Position: gl.getAttribLocation(prog, "a_Position"),
    a_Normal: gl.getAttribLocation(prog, "a_Normal"),
    a_Texcoord: gl.getAttribLocation(prog, "a_Texcoord"),

    u_PMatrix: gl.getUniformLocation(prog, "u_PMatrix"),
    u_MVMatrix: gl.getUniformLocation(prog, "u_MVMatrix"),
    u_NMatrix: gl.getUniformLocation(prog, "u_NMatrix"),

    u_AmbientColor: gl.getUniformLocation(prog, "u_AmbientColor"),
    u_DiffuseColor: gl.getUniformLocation(prog, "u_DiffuseColor"),
    u_SpecularColor: gl.getUniformLocation(prog, "u_SpecularColor"),
    u_LightingPos: gl.getUniformLocation(prog, "u_LightingPos"),

    u_MaterialAmbientColor: gl.getUniformLocation(prog, "u_MaterialAmbientColor"),
    u_MaterialSpecularColor: gl.getUniformLocation(prog, "u_MaterialSpecularColor"),

    u_Sampler: gl.getUniformLocation(prog, "u_Sampler"),
  };
};

export const createProgram = (gl, [vs, fs]) => {
  const glProg = gluCreateProgram(gl, vs(gl), fs(gl));
  return program(gl, glProg);
}; 