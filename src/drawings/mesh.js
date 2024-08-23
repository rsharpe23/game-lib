import { mat4 } from '../../../lib/gl-matrix/index.js';
import { setMatrixUniform } from '../../../lib/gl-utils.js';
import { calcNormalMatrix } from '../../plugins/calc-matrix.js';
import { findNode } from '../../node/index.js';
import Drawing from '../drawing.js';

// Отправить в plugins/addons/extra/common
class TRS {
  constructor(translation, rotation, scale) {
    this.translation = translation;
    this.rotation = rotation;
    this.scale = scale;
  }

  calcMatrix(matrix) {
    mat4.fromRotationTranslationScale(
      matrix, this.rotation, this.translation, this.scale);
  }
}

class Object3D extends Drawing {
  matrix = mat4.create();

  constructor(name, tag, trs) {
    super(name, tag);
    this.trs = trs;
  }

  // Установить трансформации во внешнем коде можно 
  // через обращение напрямую к trs

  get position() {
    return this.trs.translation; 
  }

  get rotation() {
    return this.trs.rotation;
  }

  get scale() {
    return this.trs.scale;
  }

  _update(appProps) {
    this._calcMatrix(this.matrix, this.parent?.matrix);
  }

  _calcMatrix(matrix, matrixOfParent) {
    this.trs.calcMatrix(matrix); // локальная матрица модели
    if (matrixOfParent) {
      mat4.mul(matrix, matrixOfParent, matrix); // мировая матрица модели
    }
  }
}

// Для группы мешей нужна своя сцена (MeshGroup), 
// где будут устанавлены общая программа и текстура/материал 

const drawPrimitive = (gl, prog, primitive) => {
  setAttribute(gl, prog.a_Position, primitive.vbo);
  setAttribute(gl, prog.a_Normal, primitive.nbo);
  setAttribute(gl, prog.a_Texcoord, primitive.tbo);
  drawElements(gl, primitive.ibo);
};

export default class extends Object3D {
  // TODO: Убрать сокращения из общих названий (см. Заметки 2)
  modelViewMat = mat4.create();
  normalMat = mat4.create();

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

    mat4.mul(this.modelViewMat, this._camera.viewMat, this.matrix);
    setMatrixUniform(gl, prog.u_MVMatrix, this.modelViewMat);

    calcNormalMatrix(this.normalMat, this.modelViewMat);
    setMatrixUniform(gl, prog.u_NMatrix, this.normalMat);

    for (const primitive of this.primitives) {
      // Эффект каркаса (wireframe) можно реализовать с пом. 
      // режима отрисовки примитивов - gl.LINE_STRIP
      drawPrimitive(gl, prog, primitive);
    }
  }
}