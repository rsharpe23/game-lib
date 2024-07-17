import Geometry from './geometry.js';
import NodeTree from './node-tree.js';
import MeshParser from './mesh-parser.js';

import { loadJson, loadBuffer } from '../../../lib/load-api.js';
import { getPath } from './util.js';

export const parseGltf = gltf => {
  const { scene, scenes, nodes, ...rest } = gltf;
  const nodeTree = new NodeTree(nodes);
  const meshParser = new MeshParser(rest);
  return new Geometry(scenes[scene], nodeTree, meshParser);
};

export const loadGltf = async dir => {
  const gltf = await loadJson(getPath(dir));
  const { uri } = gltf.buffers[0];
  gltf.buffers[0] = await loadBuffer(getPath(dir, uri));
  return gltf;
};

export const loadGeometry = async dir => {
  const gltf = await loadGltf(dir);
  return parseGltf(gltf);
};