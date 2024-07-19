import '../lib/gl-matrix.js';
import '../lib/global-ext.js';

import { loadImage } from '../lib/load-api.js';
import { loadShaders } from '../src/core/shader-api.js'
import { loadGeometry } from '../src/core/gltf-api/index.js';
import { createProgram } from '../src/core/program-api.js';
import { createTexture } from '../src/core/texture-api.js';

import app from '../src/app.js';
import Scene from '../src/scene.js';
import Camera from './camera.js';
import Light from '../src/light.js';
import Mesh from '../src/visuals/mesh/index.js';
import TRS from '../src/core/trs.js';

const { props } = app;
const { gl, store } = props;

// После того, как был изменен способ загрузки gltf (с раздельного gltf + bin на сплошной), 
// стала появлятся ошибка: "WebGL warning: tex(Sub)Image[23]D: Resource has no data (yet?)."
// До этого она появлялась лишь изредко. При этом, чем быстрее загрузка данных, 
// тем больше вероятностью её появления. Возникает она, скорей всего, 
// из-за загрузки изображений через fetch, а сам процесс создания 
// обьекта изображения не совсем синхронный (даже через blob).
const [shaders, texImg, geometry] = await Promise.all([
  loadShaders('/shaders/default'),
  loadImage('assets/texture.jpg'),
  loadGeometry('assets/tank.gltf'),
]);

const createScene = (camera, light) => {
  const scene = new Scene(camera, light);
  // scene.addVisual(new Mesh('tank', new TRS(), texImg, geometry));

  const translations = [
    [ 0,  0,  0],
    [ 0,  0,  7],
    [ 0,  0, -7],
    [ 7,  0,  0],
    [-7,  0,  0],
    [ 7,  0,  7],
    [ 7,  0, -7],
    [-7,  0,  7],
    [-7,  0, -7],
  ];

  for (const translation of translations) {
    const mesh = new Mesh('tank', 
      new TRS({ translation }), texImg, geometry);

    scene.addVisual(mesh);
  }

  return scene;
};

props.prog = createProgram(gl, shaders);
props.updatable = createScene(new Camera([0, 5, 20]), new Light([0, -70, -100]));

// Создавать текстуру лучше после создания программы, иначе может 
// появиться всё таже ошибка "WebGL warning: tex(Sub)Image[23]D"
store.set(geometry, {});
store.set(texImg, createTexture(gl, texImg));

app.loop(performance.now());