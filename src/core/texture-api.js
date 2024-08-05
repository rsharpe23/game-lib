import { isPowerOf2 } from '../../lib/math.js';
import { createTexture as gluCreateTexture } from './gl-util.js';

export const createTexture = (gl, img) => 
  gluCreateTexture(gl, img, isPowerOf2);