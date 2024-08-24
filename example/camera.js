import { degToRad } from '../lib/math.js';
import { vec3, quat } from '../lib/gl-matrix/index.js';
import Camera from '../src/camera/index.js';

export default class extends Camera {
  rotation = quat.create();

  constructor(name, position) {
    super(name, position, [0, 0, 0]);
  }

  _beforeUpdate({ gl }) {
    const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
    this.projection.aspect = w / h;
  }

  _update(appProps) {
    this._calcRotation(this.rotation, appProps.deltaTime);
    vec3.transformQuat(this.position, this.position, this.rotation);
    super._update(appProps);
  }

  _calcRotation(out, deltaTime) {
    quat.fromEuler(out, 0, degToRad(deltaTime), 0);
  }
};