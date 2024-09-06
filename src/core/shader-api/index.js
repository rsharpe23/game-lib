import { loadText } from '../../../lib/loader.js';
import Shader from './shader.js';

export const loadShader = async path => {
  const src = await loadText(path);
  return new Shader(src);
};

export const loadShaders = dir => {
  const requiredFiles = ['vert.glsl', 'frag.glsl'];

  const requests = requiredFiles
    .map(file => loadShader(`${dir}/${file}`));

  return Promise.all(requests);
};

export { Shader };