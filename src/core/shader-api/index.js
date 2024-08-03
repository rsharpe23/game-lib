// Если в файле index.js участвуют также некоторые классы api, 
// которые также нужно экспортировать, то вместо реэкспорта в начале 
// можно импортировать их, как будто они внутренний, а после использования 
// экспортировать в самом конце, после дефолтного экспорта. 
// Такой вариант более понятен, чем реэкспорт в начале файла.

import { loadText } from '../../../lib/load-api';
import Shader from './shader';

export const loadShader = async path => {
  const src = await loadText(path);
  return new Shader(src);
};

export const loadShaders = dir => {
  const requiredFiles = ['vert.build.glsl', 'frag.build.glsl'];

  const requests = requiredFiles
    .map(file => loadShader(`${dir}/${file}`));

  return Promise.all(requests);
};

export { Shader };