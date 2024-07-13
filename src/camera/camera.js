import Updatable from '../updatable.js';
import Perspective from './projections/perspective.js';

const { mat4 } = glMatrix;

export default class extends Updatable {
  viewMat = mat4.create();
  projection = new Perspective();

  constructor(position, lookAtPoint) {
    super();
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projectionMat() {
    return this.projection.matrix;
  }

  _update(appProps) {
    this.projection.applyMatrix(appProps.gl, appProps.prog);
    mat4.lookAt(this.viewMat, this.position, 
      this.lookAtPoint, [0, 1, 0]);
  }
};