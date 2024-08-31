import { createBuffer } from '../../../../lib/gl-utils.js';
import parse from './utils/parse.js';

export default class {
  constructor(gl) {
    this._gl = gl;
  }

  parse(gltf, callback) {
    const glBuffer = (data, target) => 
      createBuffer(this._gl, data, target);

    parse({ ...gltf, glBuffer }, callback);
  }
}