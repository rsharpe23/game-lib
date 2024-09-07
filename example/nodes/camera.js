import { degToRad } from '../../lib/math.js';
import { vec3, quat } from '../../lib/gl-matrix/index.js';
import { Camera } from '../../src/index.js';

// Лучше не делать оберток вокруг готовых нодов, например для камеры: 
// new OrbitControl(new Camera()), поскольку в таком случае будет 
// сложно ей манипулировать из вне. Например если понадобиться сделать 
// её дочерней для какого-нибудь конкретного нода, то что будет 
// с OrbitControl? Его тоже придется переносить?

// Кроме того, такой подход позволит сильно упростить 
// оптимизацию drawing'ов по программе.

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