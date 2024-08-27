import { mat4 } from '../../../lib/gl-matrix/index.js';

export default class {
  // Пропсы в виде объекта позволят задавать трансформации по отдельности, 
  // пропуская ненужные. Кроме того, если сделать отдельные параметры 
  // и передавать в них ссылки из gltf, то изменение значений 
  // в одном из TRS затронут все остальные
  constructor({ translation, rotation, scale }) {
    this.translation = translation ?? [0, 0, 0];
    this.rotation = rotation ?? [0, 0, 0, 1];
    this.scale = scale ?? [1, 1, 1];
  }

  calcMatrix(out) {
    mat4.fromRotationTranslationScale(out,
      this.rotation, this.translation, this.scale);
  }
}
