import '../lib/gl-matrix.js';
import '../lib/global-ext.js';

import { loadBlob } from '../lib/load-api.js';
import { loadGeometry } from '../src/core/gltf-api/index.js';

import app from '../src/app.js';
import Scene from '../src/scene.js';
import Camera from './camera.js';
import Light from '../src/light.js';
import Mesh from '../src/visuality/mesh/index.js';
import TRS from '../src/core/trs.js';

const loadImg = async url => {
  const blob = await loadBlob(url);
  return Image.from(URL.createObjectURL(blob));
};

// TODO: Инкапсулировать установку стора
const loadGeometryProxy = async dir => {
  const geometry = await loadGeometry(dir);
  app.props.store.set(geometry, {});
  return geometry;
};

const createScene = ([texAtlas, geometry]) => {
  const camera = new Camera([0, 5, 20]);
  const light = new Light([0, -70, -100]);

  const scene = new Scene(texAtlas, camera, light);
  // scene.add(new Mesh('tank', new TRS(), geometry));

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
    scene.add(new Mesh('tank', new TRS({ translation }), geometry));
  }

  return scene;
};

const res = await Promise.all([
  loadImg('tex-atlas.jpg'), 
  loadGeometryProxy('tank'),
]);

// Если app.props.updatable задать null, то weakMap очистится автоматически.
// Но если перед этим вывести props на консоль, то будет показано
// что weakMap имеет по прежнему геометрию. Возможно, это из-за того, 
// что ссылка на неё попадает в ф-цию log().
app.run(createScene(res));