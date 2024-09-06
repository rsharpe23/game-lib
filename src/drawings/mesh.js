import { setMatrixUniform, setAttribute as gluSetAttribute, 
  drawElements as gluDrawElements } from '../../lib/gl-utils.js';

import { mat4 } from '../../lib/gl-matrix/index.js';
import calcNormalMatrix from '../utils/calc-normal-mat.js';
import MeshBase from './mesh-base.js';

// Вынести в gl-utils
const setAttribute = (gl, attr, buffer) => {
  gluSetAttribute(gl, attr, buffer.buffer, buffer.typeSize, 
    buffer.componentType);
};

const drawElements = (gl, buffer) => {
  gluDrawElements(gl, buffer.buffer, buffer.count, 
    buffer.componentType);
};
// -----------

const drawPrimitive = (gl, prog, primitive) => {
  setAttribute(gl, prog.a_Position, primitive.vbo);
  setAttribute(gl, prog.a_Normal, primitive.nbo);
  setAttribute(gl, prog.a_Texcoord, primitive.tbo);
  drawElements(gl, primitive.ibo);
};

export default class extends MeshBase {
  mvMatrix = mat4.create();
  normalMatrix = mat4.create();

  constructor(name, trs, primitives, texImg) {
    super(name, trs, texImg);
    this.primitives = primitives;
  }

  _beforeUpdate({ scene }) {
    this._camera = scene.findChild('Camera');
  }

  _update(appProps) {
    super._update(appProps);

    const gl = appProps.gl;
    const prog = appProps.prog;

    mat4.mul(this.mvMatrix, this._camera.viewMatrix, this.matrix);
    setMatrixUniform(gl, prog.u_MVMatrix, this.mvMatrix);

    calcNormalMatrix(this.normalMatrix, this.mvMatrix);
    setMatrixUniform(gl, prog.u_NMatrix, this.normalMatrix);

    for (const primitive of this.primitives) 
      drawPrimitive(gl, prog, primitive);
  }
}
