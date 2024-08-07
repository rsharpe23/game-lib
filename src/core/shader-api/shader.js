import { createShader } from '../../../lib/gl-utils.js';

export default class extends Callable {
  constructor(src) {
    super();
    this.src = src;
  }

  parse() {
    const matches = this.src.matchAll(
      /\s*(attribute|uniform)\s+((low|medium|high)p\s+)?\w+\s+(\w+)\s*;/g);

    return Array.from(matches).map(item => [item[1], item[4]]);
  }

  // Можно заменить на compile
  _call(gl, type) {
    return createShader(gl, type, this.src);
  }
}
