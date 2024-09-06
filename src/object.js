export default class {
  constructor(name, tag) {
    this.name = name;
    this.tag = tag;
  }

  update(appProps) {
    if (this._canUpdate) {
      this._update(appProps);
      return;
    }

    this._beforeUpdate?.(appProps);
    this._canUpdate = true;
  }
}