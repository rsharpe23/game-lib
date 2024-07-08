import { loadText } from '../../lib/load-api.js'; 
import { createShader } from '../../lib/glu.js';

const files = [
  { name: 'vs', shaderType: 35633 },
  { name: 'fs', shaderType: 35632 },
];

export const loadShader = async url => {
  const text = await loadText(url);
  return (gl, type) => createShader(gl, type, text);
};

export const loadShaders = async dir => {
  const requests = files.map(({ name, shaderType }) => {
    const fn = loadShader(`${dir}/${name}.glsl`);
    return gl => fn(gl, shaderType);
  });

  return Promise.all(requests);
};