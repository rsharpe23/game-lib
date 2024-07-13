import TRS from '../trs.js';

let uid = 0;

export default class {
  constructor(scene, nodeTree, meshParser) {
    this.scene = scene;
    this.nodeTree = nodeTree;
    this.meshParser = meshParser;
    this.id = uid++;
  }
  
  *[Symbol.iterator]() {
    yield* this.nodeTree.traverse(this.scene.nodes, 
      (node, parent) => {
        node.trs = new TRS(node, parent?.trs);
        return this._parseNode(node);
      });
  }

  _parseNode({ name, trs, mesh }) {
    const primitives = this.meshParser.parseMesh(mesh);
    return { name, trs, primitives }; // добавить геттер matrix
  }
};