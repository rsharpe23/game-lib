import { createProgram } from './gl-utils.js';

export default class {
  _used = false;

  constructor(gl, target) {
    this.gl = gl;
    this.target = target;
    this._setLocations(this);
  }

  static from(gl, [vs, fs]) {
    const target = createProgram(gl, vs(gl), fs(gl));
    return new this(gl, target);
  }

  _setLocations(prog) {
    throw new Error('Not implemented');
  }

  use() {
    if (this._used) return;
    this._use(this);
    this._used = true;
  }

  _use({ gl, target }) {
    gl.useProgram(target);
  }
}