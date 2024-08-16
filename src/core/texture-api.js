import { isPowerOf2 } from '../../lib/math.js';
import { createTexture as gluCreateTexture } from '../../lib/gl-utils.js';

// Можно переименовать на texture-utils

export const createTexture = (gl, img) => 
  gluCreateTexture(gl, img, isPowerOf2);