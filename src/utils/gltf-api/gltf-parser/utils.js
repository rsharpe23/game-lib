// Если модуль (класс) имеет несколько реализаций, то доп. ф-ционал можно 
// выносить в файл утилит. Если реализация одна, то лучше оставлять доп. ф-ционал 
// в том же файле (если он не требует зависимостей)

export const typeSizeMap = { 'SCALAR': 1, 'VEC2': 2, 'VEC3': 3 };

export const getRoot = ({ nodes }) => ({ children: nodes });

export const mapPrimitives = ({ primitives }, getAccessor) => {
  return primitives.map(({ attributes, indices }) => ({
    vbo: getAccessor(attributes['POSITION']),
    nbo: getAccessor(attributes['NORMAL']),
    tbo: getAccessor(attributes['TEXCOORD_0']),
    ibo: getAccessor(indices),
  }));
};