import TRS from '../trs.js';

export default class {
  constructor(scene, nodeTree, meshParser) {
    this.scene = scene;
    this.nodeTree = nodeTree;
    this.meshParser = meshParser;
  }
  
  *[Symbol.iterator]() {
    yield* this.nodeTree.traverse(this.scene.nodes, 
      (node, parent) => {
        node.trs = new TRS(node, parent?.trs);
        return this._parseNode(node);
      });
  }

  _parseNode({ name, trs, mesh }) {
    return { 
      name, trs, 
      primitives: this.meshParser.parseMesh(mesh),
      get matrix() { 
        return this.trs.matrix; 
      }, 
    };
  }
};