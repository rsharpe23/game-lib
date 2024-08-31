import { createBuffer } from '../../../../lib/gl-utils.js';
import parse from './parse.js';

export default class {
  constructor(gl) {
    this._gl = gl;
  }

  parse(gltf, callback) {
    const glBufferCb = this._glBufferCb 
      ??= createBuffer.bind(null, this._gl);

    parse({ ...gltf, glBufferCb }, callback);
  }
}