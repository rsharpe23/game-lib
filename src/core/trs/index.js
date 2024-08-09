import Base from "./base.js";

// Если в классе явно объявить свойство _committed со значением false, 
// то нарушится логика работы _calcMatrix(). Это из-за того, что сначала 
// вызывается конструктор базового класса и this получает только то, что 
// задаётся там. Т.е. по порядку будут вызыватся переопределенные сеттеры 
// и их коммиты. Внутри коммита свойство _committed установится в true, 
// но после того как базовый конструктор отработает, вызовется конструктор 
// текущего класса и перезатрёт _commited в дефолтное значение false, и 
// _calcMatrix() не сможет выполнить свой расчет. Эта ошибка приводит 
// к тому, что когда вызывается new TRS(...) во внешнем коде, 
// все первоначальные значения игнорируются.

export default class extends Base {
  setTranslation(x, y, z) {
    super.setTranslation(x, y, z);
    this.commit();
  }

  setRotation(x, y, z, w) {
    super.setRotation(x, y, z, w);
    this.commit();
  }

  setScale(x, y, z) {
    super.setScale(x, y, z);
    this.commit();
  }

  setParent(value) {
    super.setParent(value);
    this.commit();
  }

  commit() {
    if (this._committed) return;
    this._committed = true;
    for (const child of this.children) {
      child.commit();
    }
  }

  // Вычисляется на 10% быстрее
  _calcMatrix(out) {  
    if (!this._committed) return;
    this._calcWorldMatrix(out);
    this._committed = false; 
  }
}