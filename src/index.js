// Как вариант, вместо того чтобы делать реэкспорт модулей, можно 
// просто указать путь к src в импортмапе и секции exports (package.json), 
// и импортировать нужные модули в зависимости от их каталога:
// import { TRS } from 'game-lib/core/trs.js';
// (ПОДХОДИТ ТОЛЬКО ДЛЯ МОДУЛЕЙ, НО НЕ ДЛЯ РАБОТЫ ЧЕРЕЗ БРАУЗЕР!)

// import * as gltfApi from './core/gltf-api/index.js';
// import * as progApi from './core/program-api/index.js';
// import * as shaderApi from './core/shader-api/index.js';
// import * as texApi from './core/texture-api.js';

// export { gltfApi, progApi, shaderApi, texApi };
// export { default as TRS } from './core/trs.js';

// export { default as app } from './app.js';
// export { default as Light } from './light.js';
// export { default as Scene } from './scene.js';

// export * from './camera/index.js';
// export { default as Camera } from './camera/index.js';

// // export { default as Mesh } from './drawings/mesh/index.js';
// export { default as DebugLine } from './drawings/debug-line.js';

// ------------

export * as texApi from './core/texture-api.js';
export * as progApi from './core/program-api/index.js';
export * as shaderApi from './core/shader-api/index.js';
export * as gltfApi from './core/gltf-api/index.js';

export { default as TRS } from './utils/trs.js';
export { default as MeshBuilder } from './utils/mesh-builder.js';
export { default as calcNormalMatrix } from './utils/calc-normal-mat.js';

export { default as Drawing } from './drawings/drawing.js';
export { default as Object3D } from './drawings/object3d.js';
export { default as MeshBase } from './drawings/mesh-base.js';
export { default as Mesh } from './drawings/mesh.js';
export { default as DebugLine } from './drawings/debug-line/index.js';

export * from './camera/index.js';
export { default } from './camera/index.js';

export { default as Light } from './light.js';
export { default as Scene } from './scene.js';
export { default as Node } from './node.js';
export { default as Object } from './object.js';
export { default as app } from './app.js';