import '../lib/gl-matrix.js';
import '../lib/global-ext.js';

import { loadBlob } from '../lib/load-api.js';
import { loadGeometry } from '../src/core/gltf-api/index.js';

import app from '../src/app.js';
import Scene from '../src/scene.js';
import Camera from './camera.js';
import Light from '../src/light.js';
import Mesh from '../src/visuality/mesh.js';
import TRS from '../src/core/trs.js';

const loadImg = async url => {
  const blob = await loadBlob(url);
  return Image.from(URL.createObjectURL(blob));
};

const _loadGeometry = async dir => {
  const geometry = await loadGeometry(dir);
  app.props.store[geometry.id] = {};
  return geometry;
};

const createScene = ([texAtlas, geometry]) => {
  const scene = new Scene(texAtlas, 
    new Camera([0, 5, 20]), new Light([0, -70, -100]));

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
  //   scene.add(new Mesh('tank', new TRS({ translation }), geometry));
  // }

  scene.add(new Mesh('tank', new TRS({ translation: [0, 0, 0] }), geometry));

  return scene;
};

const res = await Promise.all([
  loadImg('tex-atlas.jpg'), 
  _loadGeometry('tank'),
]);

app.run(createScene(res));