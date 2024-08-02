import '../lib/global-ext.js';
import { loadImage } from '../lib/load-api.js';
import Camera from './camera.js';

import { app, mesh, progApi, shaderApi, gltfApi, texApi, 
  Scene, Light, Ray, TRS } from 'game-framework';

const { props } = app;
const { gl, store } = props;

// После того, как был изменен способ загрузки gltf (с раздельного gltf + bin на сплошной), 
// стала появлятся ошибка: "WebGL warning: tex(Sub)Image[23]D: Resource has no data (yet?)."
// До этого она появлялась лишь изредко. При этом, чем быстрее загрузка данных, 
// тем больше вероятностью её появления. Возникает она, скорей всего, 
// из-за загрузки изображений через fetch, а сам процесс создания 
// обьекта изображения не совсем синхронный (даже через blob).
const [shaders, texImg, geometry] = await Promise.all([
  shaderApi.loadShaders('/shaders/@default'),
  loadImage('assets/texture.jpg'),
  gltfApi.loadGeometry('assets/tank.gltf'),
]);

const createScene = (camera, light) => {
  const scene = new Scene(camera, light);
  scene.addVisual(new mesh.Mesh('tank', new TRS(), texImg, geometry));
  scene.addVisual(new Ray('ray', new TRS({ translation: [0, 3, 0], scale: [5, 1, 1] }) ));

  // const translations = [
  //   [ 0,  0,  0],
  //   [ 0,  0,  7],
  //   [ 0,  0, -7],
  //   [ 7,  0,  0],
  //   [-7,  0,  0],
  //   [ 7,  0,  7],
  //   [ 7,  0, -7],
  //   [-7,  0,  7],
  //   [-7,  0, -7],
  // ];

  // for (const translation of translations) {
  //   const mesh = new Mesh('tank', 
  //     new TRS({ translation }), texImg, geometry);

  //   scene.addVisual(mesh);
  // }

  return scene;
};

// TODO: Инкапсулировать в какой-нибудь asset bundle manager, 
// вместе с загрузкой ресурсов (shaders, geometry, texture и пр.)
store.set(geometry, {});
store.set(texImg, texApi.createTexture(gl, texImg));

// TODO: Сделать так, чтобы при потере ссылки на сцену, 
// очищались свяазанные данные из store
props.prog = progApi.createProgram(gl, shaders);
props.updatable = createScene(new Camera([0, 5, 20]), new Light([0, -70, -100]));
app.loop(performance.now());