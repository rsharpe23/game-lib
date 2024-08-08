import TRS from '../trs/index.js';

export default class {
  constructor(scene, nodeTree, meshParser) {
    this._scene = scene;
    this._nodeTree = nodeTree;
    this._meshParser = meshParser;
  }
  
  traverse(callback) {
    this._nodeTree.traverse(this._scene.nodes, 
      (node, parent) => {
        node.trs = new TRS(node, parent?.trs);
        callback(this._parseNode(node));
      });
  }

  _parseNode({ name, trs, mesh }) {
    return { 
      name, trs, 
      primitives: this._meshParser.parseMesh(mesh),
      get matrix() { 
        return this.trs.matrix; 
      }, 
    };
  }
}