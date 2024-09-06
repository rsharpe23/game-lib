import { mat4 } from '../../../lib/gl-matrix/index.js';
import Drawing from './drawing.js';

// 3d объектом может быть не только меш, но и спецэффект
// Drawing3D некорретное название, поскольку DebugLine наследуется от 
// обычного Drawing'а и при этом также отображается в 3D

export default class extends Drawing {
  matrix = mat4.create();

  constructor(name, tag, trs) {
    super(name, tag);
    this.trs = trs;
  }

  // Сеттеры отсутсвуют по той причине, что трансформации должны 
  // задаваться через обращения к геттерам: mesh.position.x = 230. 
  // Поскольку эта процедура в основном будет происходить в update(), 
  // то переназначения сразу всего объекта будет вызывать фризы из-за 
  // интенсивной работы GC. Но если все-таки требуется переназначить 
  // объект, то лучше это сделать напрямую через trs.

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
    this.trs.calcMatrix(matrix); // матрица модели
    if (matrixOfParent)
      mat4.mul(matrix, matrixOfParent, matrix); // мировая матрица модели
  }
}