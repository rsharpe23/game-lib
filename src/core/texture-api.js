import { isPowerOf2 } from '../../lib/math.js';
import { createTexture as gluCreateTexture } from './gl-util.js';

export const createTexture = (gl, img) => {
  return gluCreateTexture(gl, img, isPowerOf2);
};