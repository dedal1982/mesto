import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);

    this._title = this._popup.querySelector('.popup-fullScreen__caption');
    this._image = this._popup.querySelector('.popup-fullScreen__img');
    this._alt = this._popup.querySelector('.popup-fullScreen__img');
  }

  open(name, link, alt) {
    super.open();
    this._title.textContent = name;
    this._image.src = link;
    this._alt.alt = alt;
  }
}
