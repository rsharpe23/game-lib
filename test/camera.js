import Camera, { Perspective } from '../src/camera.js';
import { degToRad } from '../lib/math.js';

const { vec3, quat } = glMatrix;
const rotation = quat.create();

export default class extends Camera {
  constructor(position) {
    super(position, new Perspective(1.04, 1, 0.1, 1000));
  }

  _beforeUpdate({ gl }) {
    const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
    this.projection.aspect = w / h;
  }

  _update(appProps) {
    const deltaTime = appProps.deltaTime;
    quat.fromEuler(rotation, 0, degToRad(deltaTime), 0);
    vec3.transformQuat(this.position, this.position, rotation);
    super._update(appProps);
  }
};