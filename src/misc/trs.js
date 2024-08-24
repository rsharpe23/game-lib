import { mat4 } from '../../../lib/gl-matrix/index.js';

export default class {
  constructor(translation, rotation, scale) {
    this.translation = translation;
    this.rotation = rotation;
    this.scale = scale;
  }

  calcMatrix(out) {
    mat4.fromRotationTranslationScale(out,
      this.rotation, this.translation, this.scale);
  }
}
