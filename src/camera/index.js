// В одной папке camera не может быть несколько разных файлов камер, 
// например сamera и orbit-camera. В этом случае нужно сделать папку cameras, 
// которая будет содержать подпапку camera (с её функционалом) и orbit-camera. 
// Посему можно смело размещать основные классы в файлах index.js

// Кроме того, если модуль определен папкой, а не файлом, то лучше не делать 
// экспорт его по умолчанию, поскольку в экспорт могут входить и внутр. модули.

import { mat4 } from '../../lib/gl-matrix';
import Updatable from '../updatable';
import Perspective from './projections/perspective';

export class Camera extends Updatable {
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

export { default as Projection } from './projections/projection';
export { Perspective };