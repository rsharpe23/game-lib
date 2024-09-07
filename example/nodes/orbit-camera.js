import { clamp } from '../../lib/math.js';
import { vec3, quat } from '../../lib/gl-matrix/index.js';
import { Camera } from '../../src/index.js';

const eulerAngles = vec3.create();

export default class extends Camera {
  constructor(name, position) {
    super(name, position, [0, 0, 0]);
  }

  // Проекцию нужно настраивать во внешнем коде
  _beforeUpdate({ gl }) {
    const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
    this.projection.aspect = w / h;
  }

  _update(appProps) {
    const screen = appProps.input.screen;
    const dt = appProps.deltaTime;

    eulerAngles[0] += screen.dy * dt * -0.01;
    eulerAngles[0] = clamp(eulerAngles[0], -89, 89);
    eulerAngles[1] += screen.dx * dt * -0.01;

    const rotation = quat.create();
    quat.fromEuler(rotation, ...eulerAngles);

    const position = [0, 0, 1];
    vec3.transformQuat(position, position, rotation);
    vec3.scale(this.position, position, 10);

    super._update(appProps);
  }
}