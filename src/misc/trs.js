import { mat4 } from '../../../lib/gl-matrix/index.js';

export default class {
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
