import { loadShaders } from './shader-api.js';
import { createProgram } from '../../lib/glu.js';

export default class {
  constructor(origin) {
    this.origin = origin;
  }

  static async load() {
    const shaders = await loadShaders('/shaders/default');
    return gl => this.from(gl, shaders);
  }

  static from(gl, [vs, fs]) {
    const origin = createProgram(gl, vs(gl), fs(gl));
    return new this(origin);
  }

  setLocations(gl) {
    this.a_Position = gl.getAttribLocation(this.origin, "a_Position");
    this.a_Normal = gl.getAttribLocation(this.origin, "a_Normal");
    this.a_Texcoord = gl.getAttribLocation(this.origin, "a_Texcoord");
  
    this.u_PMatrix = gl.getUniformLocation(this.origin, "u_PMatrix");
    this.u_MVMatrix = gl.getUniformLocation(this.origin, "u_MVMatrix");
    this.u_NMatrix = gl.getUniformLocation(this.origin, "u_NMatrix");
    this.u_Sampler = gl.getUniformLocation(this.origin, "u_Sampler");
  
    this.u_AmbientColor = gl.getUniformLocation(this.origin, "u_AmbientColor");
    this.u_DiffuseColor = gl.getUniformLocation(this.origin, "u_DiffuseColor");
    this.u_SpecularColor = gl.getUniformLocation(this.origin, "u_SpecularColor");
    this.u_LightingPos = gl.getUniformLocation(this.origin, "u_LightingPos");
  
    this.u_MaterialAmbientColor = gl.getUniformLocation(this.origin, "u_MaterialAmbientColor");
    this.u_MaterialSpecularColor = gl.getUniformLocation(this.origin, "u_MaterialSpecularColor");
  }

  use(gl) {
    gl.useProgram(this.origin);
  }
};