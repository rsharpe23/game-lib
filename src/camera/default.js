// В одной папке camera не должно быть несколько разных реализаций камер, 
// например camera.js и orbit-camera.js. В этом случае нужно сделать папку cameras, 
// которая будет содержать подпапку camera (с её функционалом) и файл orbit-camera.js.
// Посему можно смело размещать основные модули/классы в файлах index.js.

// Если все же камера предусматривает несколько реализаций, например сначала была 
// обычная камера, а затем её заменили на оптимизированную, то в этом случае в одной папке 
// может быть несколько модулей, но их полные названия можно опускать, например файлы 
// camera.js и optimized-camera.js можно назвать default.js и optimized.js соответсвенно. 
// А файл index.js будет делать реэкспорт актуальной реализации и возможно 
// какого-то дополнительного функционала.

// Другие примеры:

// * -- mesh
// * ---- index.js
// * ---- default.js (когда нужно экспортировать и доп. функционал)
// * ---- item-list.js
// * ---- utils.js

// * -- mesh
// * ---- index.js (когда нужен только один экспорт c зависимостями)
// * ---- utils.js

// * -- meshes
// * ---- mesh (подкаталог)
// * ---- solid-mesh.js

// * -- trs-base.js
// * -- trs.js

import { mat4 } from '../../lib/gl-matrix/index.js';
import Node from '../node/index.js';
import Perspective from './projections/perspective.js';

const vectorUp = [0, 1, 0];

export default class extends Node {
  viewMat = mat4.create();
  viewProjMat = mat4.create();
  projection = new Perspective(1.04, 1, 0.1, 1000);

  constructor(name, position, lookAtPoint) {
    super(name, 'camera');
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projMat() {
    return this.projection.matrix; 
  }

  _update(appProps) {
    this.projection.apply(appProps.gl, appProps.prog);

    mat4.lookAt(this.viewMat, this.position, 
      this.lookAtPoint, vectorUp);

    mat4.mul(this.viewProjMat, this.projMat, this.viewMat);
  }
};