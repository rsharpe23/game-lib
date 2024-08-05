// В одной папке camera не может быть несколько разных файлов камер, 
// например сamera и orbit-camera. В этом случае нужно сделать папку cameras, 
// которая будет содержать подпапку camera (с её функционалом) и файл orbit-camera. 
// Посему можно смело размещать основные классы в файлах index.js

// Если модуль имеет подмодули, которые также могут вызываться 
// во внешнем коде (например у камеры это может быть подмодуль проекции),
// то такие подмодули могут экспортироваться с доп. префиксом: 
// Projection  -->  CameraProjection

import { mat4 } from '../../lib/gl-matrix/index.js';
import Updatable from '../updatable.js';
import Perspective from './projections/perspective.js';

export default class extends Updatable {
  viewMat = mat4.create();
  projection = new Perspective();

  constructor(position, lookAtPoint) {
    super();
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projMat() {
    return this.projection.matrix;
  }

  _update(appProps) {
    this.projection.setMatUniform(appProps.gl, appProps.prog);

    // Вокруг glMatrix тоже можно сделать обертку
    mat4.lookAt(this.viewMat, this.position, 
      this.lookAtPoint, [0, 1, 0]);
  }
};

export { default as CameraProjection } from './projections/projection.js';
export { Perspective as CameraPerspective };