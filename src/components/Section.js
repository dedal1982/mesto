export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  newAddItem(element){
    this._container.prepend(element);
  }
}
