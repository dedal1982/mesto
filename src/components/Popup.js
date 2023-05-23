export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close'))
      this.close();
    })
  }
}
