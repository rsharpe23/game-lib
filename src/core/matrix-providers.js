import { mat4 } from "../../lib/gl-matrix/index.js";

export class MatrixProvider {
  _matrix = mat4.create();
  
  get matrix() { 
    this._calcMatrix(this._matrix);
    return this._matrix;
  }
}

// export class OptimizedMatrixProvider extends MatrixProvider {
//   get matrix() {

//   }
// }