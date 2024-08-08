import Base from "./base.js";

export default class extends Base {
  _changed = false;

  // set translation(value) {
  //   super.translation = value;
  //   this.onChange();
  // }

  // set rotation(value) {
  //   super.rotation = value;
  //   this.onChange();
  // }

  // set scale(value) {
  //   super.scale = value;
  //   this.onChange();
  // }

  // set parent(value) {
  //   super.parent = value;
  //   this.onChange();
  // }

  onChange() {
    this._changed = true;
    for (const child of this.childs) {
      child.onChange();
    }
  }

  _calcMatrix(out) {  
    if (!this._changed) return;
    this._calcMatrix(out);
    this._changed = false; 
  }
}