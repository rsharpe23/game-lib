// Если в файле index.js участвуют также некоторые классы api, 
// которые также нужно экспортировать, то вместо реэкспорта в начале 
// можно импортировать их, как будто они внутренний, а после использования 
// экспортировать в самом конце, после дефолтного экспорта. 
// Такой вариант более понятен, чем реэкспорт в начале файла.

import { loadJson, loadBuffer } from '../../../lib/load-api';

import Geometry from './geometry';
import NodeTree from './node-tree';
import MeshParser from './mesh-parser';

export const loadGltf = async path => {
  const gltf = await loadJson(path);
  const { uri } = gltf.buffers[0];
  gltf.buffers[0] = await loadBuffer(uri);
  return gltf;
};

export const parseGltf = gltf => {
  const { scene, scenes, nodes, ...rest } = gltf;
  const nodeTree = new NodeTree(nodes);
  const meshParser = new MeshParser(rest);
  return new Geometry(scenes[scene], nodeTree, meshParser);
};

export const loadGeometry = async path => {
  const gltf = await loadGltf(path);
  return parseGltf(gltf);
};

export { Geometry, NodeTree, MeshParser };