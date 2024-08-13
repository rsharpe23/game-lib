import TRSBase from "./trs-base.js";

// Для статических объектов, скорость вычисления увелич. примерно на 13%.
// Для динамических - примерно на 3% (на уровне статистич. погрешности)

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

export default class extends TRSBase {
  setTranslation(value) {
    this.translation = value;
    this.commit();
  }

  setRotation(value) {
    this.rotation = value;
    this.commit();
  }

  setScale(value) {
    this.scale = value;
    this.commit();
  }

  _setParent(value) {
    this.parent = value;
    this.commit();
  }

  commit() {
    if (this._committed) return;
    this._committed = true;
    for (const child of this.children) {
      child.commit();
    }
  }

  _calcMatrix(out) {  
    if (!this._committed) return;
    super._calcMatrix(out);
    this._committed = false; 
  }
}