import Camera from '../src/camera.js';
import { degToRad } from '../lib/math.js';

const { vec3, quat } = glMatrix;
const rotation = quat.create();

export default class extends Camera {
  apply(appProps) {
    const deltaTime = appProps.deltaTime;
    quat.fromEuler(rotation, 0, degToRad(deltaTime), 0);
    vec3.transformQuat(this.position, this.position, rotation);
    super.apply(appProps);
  }
};