import { createBuffer } from '../../../../lib/gl-utils.js';

export default gl => createBuffer(gl, 
  new Float32Array([0, 1]), gl.ARRAY_BUFFER);