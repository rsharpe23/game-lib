import { loadText } from '../../lib/load-api.js'; 
import { createShader } from '../core/gl-api.js';

const shaders = [
  { name: 'vs', type: 35633 },
  { name: 'fs', type: 35632 },
];

export const loadShader = async url => {
  const text = await loadText(url);
  return (gl, type) => createShader(gl, type, text);
};

export const loadShaders = async dir => {
  const requests = shaders.map(async ({ name, type }) => {
    const fn = await loadShader(`${dir}/${name}.glsl`);
    return gl => fn(gl, type);
  });

  return Promise.all(requests);
};