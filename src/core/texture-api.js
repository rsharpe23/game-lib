import { isPowerOf2 } from '../../lib/math.js';
import { createTexture as gluCreateTexture } from './gl-util.js';

export const createTexture = (gl, prog) => {
  return gluCreateTexture(gl, prog, isPowerOf2);
};