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
// * ---- default.js (экспорт по умолчанию)
// * ---- item-list.js (экспорт доп. ф-ционала)

// * -- meshes
// * ---- mesh (подкаталог)
// * ---- solid-mesh.js

// * -- trs-base.js
// * -- trs.js

// По возможности, лучше не создавать внутренние приватные модули, поскольку они  
// усложняют навигацию по проекту (если только модуль не требует множества зависимостей), 

// camera
//   index.js
//   utils.js (лучше все реализовать в одном файле)

import { mat4 } from '../../lib/gl-matrix/index.js';
import Node from '../node/index.js';
import Perspective from './projections/perspective.js';

const vectorUp = [0, 1, 0];

export default class extends Node {
  vpMatrix = mat4.create();
  viewMatrix = mat4.create();
  projection = new Perspective(1.04, 1, 0.1, 1000);

  constructor(name, position, lookAtPoint) {
    super(name, 'camera');
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projMatrix() {
    return this.projection.matrix; 
  }

  _update(appProps) {
    this.projection.apply(appProps.gl, appProps.prog);

    mat4.lookAt(this.viewMatrix, 
      this.position, this.lookAtPoint, vectorUp);

    mat4.mul(this.vpMatrix, this.projMatrix, this.viewMatrix);
  }
};