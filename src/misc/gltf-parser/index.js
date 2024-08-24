import { loadJson, loadBuffer } from '../../../lib/load-api.js';
import Node, { traverse } from '../../node/index.js';
import Mesh from '../../drawings/mesh.js'
import TRS from '../trs.js';

const loadGltf = async path => {
  const gltf = await loadJson(path);
  const { uri } = gltf.buffers[0];
  gltf.buffers[0] = await loadBuffer(uri);
  return gltf;
};

// Нужная именно такая реализация traverse, иначе придется доп. 
// создавать ф-ционал преобразования индекса в в нод

const parseNode = (node, { meshes, accessors }) => {
  const mesh = meshes[node.mesh];

  node.primitives = mesh.primitives
    .map(({ attributes, indices }) => ({
      vbo: accessors[attributes['POSITION']],
      nbo: accessors[attributes['NORMAL']],
      tbo: accessors[attributes['TEXCOORD_0']],
      ibo: accessors[indices],
    }));

  return node;
};

const parse = ({ scene, scenes, nodes, ...rest }, callback) => {
  const { nodes: children } = scenes[scene];
  traverse({ children }, (index, next) => {
    const node = parseNode(nodes[index], rest);
    callback(node, index);
    next(node);
  });
};

const gltf = await loadGltf('assets/tank.gltf');
const meshGroup = new Node('MeshGroup');
const parents = {};

parse(gltf, ({ name, primitives, children, ...rest }, index) => {
  const mesh = new Mesh(name, new TRS(rest), primitives);
  mesh.setParent(parents[index] ?? meshGroup);
  if (children) {
    for (const child of children) {
      parents[child] = mesh;
    }
  }
});

console.log(meshGroup);