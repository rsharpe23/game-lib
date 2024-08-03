// import * as cam from './camera';
// import * as mesh from './visuals/mesh';
// import * as gltfApi from './core/gltf-api';
// import * as progApi from './core/program-api';
// import * as shaderApi from './core/shader-api';
// import * as texApi from './core/texture-api';
// import * as glu from './core/gl-util';

// export { cam, mesh, gltfApi, progApi, shaderApi, texApi, glu };

// export { default as app } from './app';
// export { default as Updatable } from './updatable';
// export { default as Scene } from './scene';
// export { default as Light } from './light';
// export { default as Visual } from './visuals/visual';
// export { default as Ray } from './visuals/ray';
// export { default as TRS } from './core/trs';

// ------------

// Если нужен доступ к модулям, которые не реэкспортированы, 
// то нужно обращаться к ним напрямую, через node_modules

import * as gltfApi from './core/gltf-api';
import * as progApi from './core/program-api';
import * as shaderApi from './core/shader-api';
import * as texApi from './core/texture-api';
import * as glu from './core/gl-util';

export { gltfApi, progApi, shaderApi, texApi, glu };
export { default as TRS } from './core/trs';

export { default as app } from './app';
export { default as Updatable } from './updatable';
export { default as Scene } from './scene';

export { default as Light } from './light';

export * from './camera';
export { default as Camera } from './camera';

export { default as Visual } from './visuals/visual';
export { default as Mesh } from './visuals/mesh';
export { default as Ray } from './visuals/ray';