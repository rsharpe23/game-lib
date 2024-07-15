import { loadShaders } from './shader-api.js';
import ProgramBase from './program-base.js';

const shaders = await loadShaders('/shaders/default');

export default class extends ProgramBase {
  static fromOwnShaders(gl) {
    return super.from(gl, shaders);
  }

  _setLocations({ gl, target }) {
    this.a_Position = gl.getAttribLocation(target, "a_Position");
    this.a_Normal = gl.getAttribLocation(target, "a_Normal");
    this.a_Texcoord = gl.getAttribLocation(target, "a_Texcoord");
  
    this.u_PMatrix = gl.getUniformLocation(target, "u_PMatrix");
    this.u_MVMatrix = gl.getUniformLocation(target, "u_MVMatrix");
    this.u_NMatrix = gl.getUniformLocation(target, "u_NMatrix");
    this.u_Sampler = gl.getUniformLocation(target, "u_Sampler");
  
    this.u_AmbientColor = gl.getUniformLocation(target, "u_AmbientColor");
    this.u_DiffuseColor = gl.getUniformLocation(target, "u_DiffuseColor");
    this.u_SpecularColor = gl.getUniformLocation(target, "u_SpecularColor");
    this.u_LightingPos = gl.getUniformLocation(target, "u_LightingPos");
  
    this.u_MaterialAmbientColor = gl.getUniformLocation(target, "u_MaterialAmbientColor");
    this.u_MaterialSpecularColor = gl.getUniformLocation(target, "u_MaterialSpecularColor");
  }
};