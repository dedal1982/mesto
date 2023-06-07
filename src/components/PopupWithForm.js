import Popup  from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupElement, { handleFormSubmit }) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupFormInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._popupFormInputsValues = {};
    this._popupFormInputs.forEach((input) => {
      this._popupFormInputsValues[input.name] = input.value;
    })
    return this._popupFormInputsValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
}

