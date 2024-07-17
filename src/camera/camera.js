import Updatable from '../updatable.js';
import Perspective from './projections/perspective.js';

const { mat4 } = glMatrix;

export default class extends Updatable {
  projection = new Perspective();
  viewMat = mat4.create();

  constructor(position, lookAtPoint) {
    super();
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projMat() {
    return this.projection.matrix;
  }

  _update(appProps) {
    this.projection.passMatrix(appProps.gl, appProps.prog);
    mat4.lookAt(this.viewMat, this.position, 
      this.lookAtPoint, [0, 1, 0]);
  }
};