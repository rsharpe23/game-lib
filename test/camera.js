import Camera, { Perspective } from '../src/camera.js';
import { degToRad } from '../lib/math.js';

const { vec3, quat } = glMatrix;
const rotation = quat.create();

export default class extends Camera {
  _isReady = false;

  constructor(position) {
    super(position, new Perspective(1.04, 1, 0.1, 1000));
  }

  apply(appProps) {
    if (!this._isReady) {
      const { drawingBufferWidth: w, drawingBufferHeight: h } = appProps.gl;
      this.projection.aspect = w / h;
      this._isReady = true;
    }

    const deltaTime = appProps.deltaTime;
    quat.fromEuler(rotation, 0, degToRad(deltaTime), 0);
    vec3.transformQuat(this.position, this.position, rotation);

    super.apply(appProps);
  }
};