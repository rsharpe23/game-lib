import { mat4 } from '../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../lib/gl-utils.js';
import { calcNormalMatrix } from '../misc/calc-matrix.js';
import { findNode } from '../node/index.js';
import Object3D from './object3d.js';

const drawPrimitive = (gl, prog, primitive) => {
  setAttribute(gl, prog.a_Position, primitive.vbo);
  setAttribute(gl, prog.a_Normal, primitive.nbo);
  setAttribute(gl, prog.a_Texcoord, primitive.tbo);
  drawElements(gl, primitive.ibo);
};

// Для группы мешей нужна своя сцена (MeshGroup),  
// где будут устанавливаться общие текстура/материал, 
// программа, но не будет собственной отрисовки

export default class extends Object3D {
  mvMatrix = mat4.create();
  normalMatrix = mat4.create();

  // Локальный материал/текстуру можно установить через renderProps
  constructor(name, trs, primitives) {
    super(name, 'mesh', trs);
    this.primitives = primitives;
  }

  _beforeUpdate(appProps) {
    this._camera = findNode(appProps.scene, '_Camera');
  }

  _update(appProps) {
    super._update(appProps);

    const gl = appProps.gl;
    const prog = appProps.prog;

    // TODO: Добавить установку локального матриала/текстуры (если они есть)

    mat4.mul(this.mvMatrix, this._camera.viewMatrix, this.matrix);
    setMatrixUniform(gl, prog.u_MVMatrix, this.mvMatrix);

    calcNormalMatrix(this.normalMatrix, this.mvMatrix);
    setMatrixUniform(gl, prog.u_NMatrix, this.normalMatrix);

    for (const primitive of this.primitives) 
      drawPrimitive(gl, prog, primitive);
  }
}
