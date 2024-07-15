import { loadText } from '../../lib/load-api.js'; 
import { createShader } from './gl-utils.js';

const shaders = [
  { file: 'vs.glsl', type: 35633 },
  { file: 'fs.glsl', type: 35632 },
];

export const loadShader = async url => {
  const text = await loadText(url);
  return (gl, type) => createShader(gl, type, text);
};

export const loadShaders = async dir => {
  const requests = shaders.map(async ({ file, type }) => {
    const fn = await loadShader(`${dir}/${file}`);
    return gl => fn(gl, type);
  });

  return Promise.all(requests);
};