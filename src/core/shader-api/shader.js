import { createShader } from '../gl-util.js';

export default class extends Callable {
  constructor(src) {
    super();
    this.src = src;
  }

  parse() {
    const matches = this.src.matchAll(
      /\s*(attribute|uniform)\s+\w+\s+(\w+)\s*;/g);

    return Array.from(matches).map(item => ({
      name: item[2],
      qualifier: item[1],
    }));
  }

  _call(gl, type) {
    return createShader(gl, type, this.src);
  }
}
