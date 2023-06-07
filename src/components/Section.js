export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    })
  }

  newAddItem(element){
    this._container.prepend(element);
  }
}
