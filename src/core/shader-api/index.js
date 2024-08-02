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