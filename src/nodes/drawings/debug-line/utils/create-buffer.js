import { createBuffer } from '../../../../../lib/gl-utils.js';

export default gl => {
  const buffer = createBuffer(
    gl, new Float32Array([0, 1]), gl.ARRAY_BUFFER);

  return { 
    buffer, 
    componentType: gl.FLOAT, // шейдеру нельзя передать int
    typeSize: 1, 
    count: 2 
  };
};