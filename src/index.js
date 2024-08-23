// Если делать реэкспорт, то обязательно всех модулей, 
// иначе в билде не будут доступен весь ф-ционал.

// (ПОДХОДИТ ТОЛЬКО ДЛЯ МОДУЛЕЙ, НО НЕ ДЛЯ РАБОТЫ ЧЕРЕЗ БРАУЗЕР!)
// Как вариант, вместо того чтобы делать полный реэкспорт всех модулей, можно 
// просто указать путь к src в импортмапе и секции exports (package.json), 
// и импортировать нужные модули в зависимости от их каталога:
// import { TRS } from 'game-lib/core/trs.js';

import * as gltfApi from './core/gltf-api/index.js';
import * as progApi from './core/program-api/index.js';
import * as shaderApi from './core/shader-api/index.js';
import * as texApi from './core/texture-api.js';

export { gltfApi, progApi, shaderApi, texApi };
export { default as TRS } from './core/trs.js';

export { default as app } from './app.js';
export { default as Light } from './light.js';
export { default as Scene } from './scene.js';

export * from './camera/index.js';
export { default as Camera } from './camera/index.js';

// export { default as Mesh } from './drawings/mesh/index.js';
export { default as DebugLine } from './drawings/debug-line.js';