import { degToRad } from '../../lib/math.js';
import { vec3, quat } from '../../lib/gl-matrix/index.js';
import { Camera } from '../../src/index.js';

export default class extends Camera {
  rotation = quat.create();

  constructor(name, position) {
    super(name, position, [0, 0, 0]);
  }

  // Проекцию нужно настраивать во внешнем коде
  _beforeUpdate({ gl }) {
    const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
    this.projection.aspect = w / h;
  }

  _update(appProps) {
    this._calcRotation(this.rotation, 
      appProps.input.screen, appProps.deltaTime);

    vec3.transformQuat(this.position, 
      this.position, this.rotation);
    
    super._update(appProps);
  }

  _calcRotation(out, screen, deltaTime) {
    const dx = degToRad(-screen.dx * deltaTime);
    const dy = degToRad(-screen.dy * deltaTime);
    quat.fromEuler(out, dy, dx, 0);
  }
} 