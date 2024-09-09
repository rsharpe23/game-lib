import { createShader } from '../../../lib/gl-utils.js';

// TODO: Переделать немного, т.к. обертка шейдера должна 
// принимать в конструкторе glShader, наподобие как в Program

export default class extends Callable {
  constructor(src) {
    super();
    this.src = src;
  }

  parse() {
    // BUG: Шаблон (\w+) не находит переменные массивов
    // const matches = this.src.matchAll(
    //   /\s*(attribute|uniform)\s+((low|medium|high)p\s+)?\w+\s+(\w+)\s*;/g);

    // Точка, в отличии от \w, ищет все символы, в т.ч. и квадратные скобки
    const matches = this.src.matchAll(
      /\s*(attribute|uniform)\s+((low|medium|high)p\s+)?\w+\s+(.+)\s*;/g);

    return Array.from(matches).map(
      item => [item[1], item[4].replace(/\[\d+\]/, '')]);
  }

  _call(gl, type) {
    return createShader(gl, type, this.src);
  }
}
