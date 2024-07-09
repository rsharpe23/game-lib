import '../require/gl-matrix.js';
import '../require/global-ext.js';

import { loadGeometry } from '../src/core/gltf-api/index.js'
import { loadBlob } from '../lib/load-api.js';

import app from '../src/app.js';
import Mesh from '../src/actors/mesh.js';
import TRS from '../src/core/trs.js';
import Scene from './scene.js';

const loadImg = async url => {
  const blob = await loadBlob(url);
  return Image.from(URL.createObjectURL(blob));
};

const _loadGeometry = async dir => {
  const geometry = await loadGeometry(dir);
  app.props.store[geometry.accessor] = {};
  return geometry;
};

const createScene = ([texAtlas, geometry]) => {
  const scene = new Scene(texAtlas);

  scene.addActor( new Mesh('tank', new TRS({ translation: [0, 0, 0] }), geometry.asArray()) );

  scene.addActor( new Mesh('tank', new TRS({ translation: [0, 0, 7] }), geometry.asArray()) );
  scene.addActor( new Mesh('tank', new TRS({ translation: [0, 0, -7] }), geometry.asArray()) );

  scene.addActor( new Mesh('tank', new TRS({ translation: [7, 0, 0] }), geometry.asArray()) );
  scene.addActor( new Mesh('tank', new TRS({ translation: [-7, 0, 0] }), geometry.asArray()) );

  scene.addActor( new Mesh('tank', new TRS({ translation: [7, 0, 7] }), geometry.asArray()) );
  scene.addActor( new Mesh('tank', new TRS({ translation: [7, 0, -7] }), geometry.asArray()) );

  scene.addActor( new Mesh('tank', new TRS({ translation: [-7, 0, 7] }), geometry.asArray()) );
  scene.addActor( new Mesh('tank', new TRS({ translation: [-7, 0, -7] }), geometry.asArray()) );

  return scene;
};

const res = await Promise.all([
  loadImg('tex-atlas.jpg'), 
  _loadGeometry('tank'),
]);

app.run(createScene(res));
