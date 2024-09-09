import { isPowerOf2 } from '../../lib/math.js';
import { createTexture } from '../../lib/gl-utils.js';

export default (gl, img) => createTexture(gl, img, isPowerOf2);