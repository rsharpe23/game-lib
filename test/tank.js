import Mesh from '../src/visuality/mesh/index.js';
import TRS from '../src/core/trs.js';
import { degToRad } from '../lib/math.js';

const { quat } = glMatrix;

export default class extends Mesh {
  constructor(geometry) {
    super('tank', new TRS(), geometry);
  }

  _update(appProps) {
    const time = appProps.time;
    quat.fromEuler(this.trs.rotation, 0, degToRad(time), 0);
    this.trs.onChange();
    super._update(appProps);
  }
}