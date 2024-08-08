// В одной папке camera не может быть несколько разных модулей камер, 
// например camera.js и orbit-camera.js. В этом случае нужно сделать папку cameras, 
// которая будет содержать подпапку camera (с её функционалом) и файл orbit-camera.js.
// Посему можно смело размещать основные модули/классы в файлах index.js.

// Если модуль/класс имеет несколько реализаций, например сначала использовалась 
// обычная камера, а затем её заменили на оптимизированную камеру, то можно опускать 
// полные названия модулей до локальных, например в папке camera, файлы camera.js 
// и optimized-camera.js можно назвать base.js и optimized.js соответсвенно. 
// А файл index.js будет делать реэкспорт актуальной реализации.

import { mat4 } from '../../lib/gl-matrix/index.js';
import Updatable from '../updatable.js';
import Perspective from './projections/perspective.js';

const vectorUp = [0, 1, 0];

export default class extends Updatable {
  viewMat = mat4.create();
  projection = new Perspective(1.04, 1, 0.1, 1000);

  constructor(position, lookAtPoint) {
    super();
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projMat() {
    return this.projection.matrix;
  }

  _update(appProps) {
    this.projection.setMatrixUniform(appProps.gl, appProps.prog);
    // Можно сделать с оптимизацией, как в Projection, 
    mat4.lookAt(this.viewMat, this.position, 
      this.lookAtPoint, vectorUp);
  }
};

export { default as Projection } from './projections/projection.js';
export { Perspective };