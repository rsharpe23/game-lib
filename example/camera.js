import { degToRad } from '../lib/math.js';
import { vec3, quat } from '../lib/gl-matrix/index.js';
import { cam } from 'game-framework';

export default class extends cam.Camera {
  rotation = quat.create();

  constructor(position) {
    super(position, [0, 0, 0]);
  }

  _beforeUpdate({ gl }) {
    const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
    this.projection.aspect = w / h;
  }

  _update(appProps) {
    const deltaTime = appProps.deltaTime;
    quat.fromEuler(this.rotation, 0, degToRad(deltaTime), 0);
    vec3.transformQuat(this.position, this.position, this.rotation);
    super._update(appProps);
  }
};