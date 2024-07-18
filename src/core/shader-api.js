import { loadText } from '../../lib/load-api.js'; 
import { createShader } from './gl-util.js';

const shaders = [
  { file: 'vs.glsl', type: 35633 },
  { file: 'fs.glsl', type: 35632 },
];

export const loadShader = async path => {
  const text = await loadText(path);
  return (gl, type) => createShader(gl, type, text);
};

export const loadShaders = async dir => {
  const requests = shaders.map(async ({ file, type }) => {
    const fn = await loadShader(`${dir}/${file}`);
    return gl => fn(gl, type);
  });

  return Promise.all(requests);
};