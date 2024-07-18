import { createProgram as glCreateProgram } from './gl-util.js';

export const createProgram = (gl, [vs, fs]) => {
  const prog = glCreateProgram(gl, vs(gl), fs(gl));

  prog.a_Position = gl.getAttribLocation(prog, "a_Position");
  prog.a_Normal = gl.getAttribLocation(prog, "a_Normal");
  prog.a_Texcoord = gl.getAttribLocation(prog, "a_Texcoord");

  prog.u_PMatrix = gl.getUniformLocation(prog, "u_PMatrix");
  prog.u_MVMatrix = gl.getUniformLocation(prog, "u_MVMatrix");
  prog.u_NMatrix = gl.getUniformLocation(prog, "u_NMatrix");
  prog.u_Sampler = gl.getUniformLocation(prog, "u_Sampler");

  prog.u_AmbientColor = gl.getUniformLocation(prog, "u_AmbientColor");
  prog.u_DiffuseColor = gl.getUniformLocation(prog, "u_DiffuseColor");
  prog.u_SpecularColor = gl.getUniformLocation(prog, "u_SpecularColor");
  prog.u_LightingPos = gl.getUniformLocation(prog, "u_LightingPos");

  prog.u_MaterialAmbientColor = gl.getUniformLocation(prog, "u_MaterialAmbientColor");
  prog.u_MaterialSpecularColor = gl.getUniformLocation(prog, "u_MaterialSpecularColor");

  return prog;
};