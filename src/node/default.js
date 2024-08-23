import Updatable from '../updatable.js';

// Св-во name напоминает id в html-элементе, а tag - класс.
// Name можно генерировать автоматически (если оно null/false) 
// так: this.constructor.name + кол-во нодов этого типа в сцене

// TODO: Написать тесты

export default class extends Updatable {
  parent = null;
  children = [];

  constructor(name, tag) {
    super();
    this.name = name;
    this.tag = tag;
  }

  appendChild(child) {
    child.setParent(this);
  }

  removeChild(child) {
    if (!this.children.includes(child)) return;
    child.setParent(null);
  }

  setParent(value) {
    // Обязательно следует перехватывать только те ошибки, которые ожидаются. 
    // А это аварийная ситуация (тоже можно перехватить, но на самом высоком уровне абстракции).
    // https://learn.microsoft.com/ru-ru/dotnet/standard/exceptions/best-practices-for-exceptions
    if (value === this) {
      throw new Error("Can't be my own parent");
    }

    if (value === this.parent) return;
    this.parent?.onRemoveChild(this);
    value?.onAppendChild(this);
    this.parent = value;
  }

  onRemoveChild(child) {
    this.children.remove(child);
  }

  onAppendChild(child) {
    this.children.push(child);
  }

  // Этот метод можно не выносить в производный класс, поскольку он 
  // по сути является обязанностью для любого класса в иерархии 
  // (что обычный Node, что NodeBase, это updatable-классы).
  update(appProps) {
    super.update(appProps);
    for (const child of this.children) {
      child.update(appProps);
    }
  }
}