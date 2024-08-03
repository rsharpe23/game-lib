import { isPowerOf2 } from '../../lib/math';
import { createTexture as gluCreateTexture } from './gl-util';

export const createTexture = (gl, img) => 
  gluCreateTexture(gl, img, isPowerOf2);