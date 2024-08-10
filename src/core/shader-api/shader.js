import { createShader } from '../../../lib/gl-utils.js';

export default class extends Callable {
  constructor(src) {
    super();
    this.src = src;
  }

  parse() {
    // BUG: Шаблон (\w+) не находит переменные массивов
    // const matches = this.src.matchAll(
    //   /\s*(attribute|uniform)\s+((low|medium|high)p\s+)?\w+\s+(\w+)\s*;/g);

    // TODO: Отбрасывать закоментированные переменные
    const matches = this.src.matchAll(
      /\s*(attribute|uniform)\s+((low|medium|high)p\s+)?\w+\s+(\w+(\[\d+\])?)\s*;/g);

    return Array.from(matches)
      .map(item => [item[1], item[4].replace(/\[\d+\]/, '')]);
  }

  // Можно заменить на compile
  _call(gl, type) {
    return createShader(gl, type, this.src);
  }
}
