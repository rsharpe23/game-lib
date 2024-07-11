export default class {
  _canUpdate = false;

  update(appProps) {
    if (this._canUpdate) {
      this._update(appProps);
      return;
    }

    this._beforeUpdate?.(appProps);
    this._canUpdate = true;
  }

  _update(appProps) {
    throw new Error('Not implemented');
  }
};