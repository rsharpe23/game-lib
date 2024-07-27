import { loadText } from '../../../lib/load-api.js';
import Shader from './shader.js';

export const loadShader = async path => {
  const src = await loadText(path);
  return new Shader(src);
};

export const loadShaders = dir => {
  const requiredFiles = ['vs.glsl', 'fs.glsl'];
  const requests = requiredFiles
    .map(file => loadShader(`${dir}/${file}`));

  return Promise.all(requests);
};