export default class {
  // Непубличные свойства лучше не объявлять явно (см. TRS)

  update(appProps) {
    if (this._canUpdate) {
      this._update(appProps);
      return;
    }

    this._beforeUpdate?.(appProps);
    this._canUpdate = true;
  }
}