import Geometry from './geometry.js';
import NodeTree from './node-tree.js';
import MeshParser from './mesh-parser.js';

import { loadJSON, loadBuffer } from '../../../lib/load-api.js';
import { getURL } from './util.js';

export const parseGLTF = ({ scene, scenes, nodes, ...rest }) => 
  new Geometry(scenes[scene], new NodeTree(nodes), new MeshParser(rest));

export const loadGLTF = async dir => {
  const gltf = await loadJSON(getURL(dir));
  const { uri } = gltf.buffers[0];
  gltf.buffers[0] = await loadBuffer(getURL(dir, uri));
  return gltf;
};

export const loadGeometry = async dir => parseGLTF(await loadGLTF(dir));