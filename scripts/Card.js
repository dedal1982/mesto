import {openPopup} from "./utils/utils.js";

class Card{
  constructor(data,templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._popupFull = document.querySelector('.popup-fullScreen')
    this._popupImg = this._popupFull.querySelector('.popup-fullScreen__img');
    this._popupCaption = this._popupFull.querySelector('.popup-fullScreen__caption');
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  getCard () {
    this._element = this._getCardTemplate();
    this._elementCard = this._element.querySelector('.element__img');
    this._elementCard.src = this._data.link;
    this._elementCard.alt = this._data.name;
    this._element.querySelector('.element__name').textContent = this._data.name;
    this._deleteButton = this._element.querySelector('.element__button-trash');
    this._cardLikeButton = this._element.querySelector('.element__button');
    this._setEventListeners()
    return this._element;
  }

  _setEventListeners(){
    this._deleteButton.addEventListener('click',this._cardDelete);
    this._cardLikeButton.addEventListener('click',this._cardLike);
    this._elementCard.addEventListener('click',this._cardFullOpenImg);
  }

  _cardDelete = () => {
    this._element.remove();
  }

  _cardLike = () => {
    this._cardLikeButton.classList.toggle('element__button-active');
  }

  _cardFullOpenImg = () =>{
    openPopup(this._popupFull)
    this._popupImg.src = this._elementCard.src;
    this._popupImg.alt = this._elementCard.alt;
    this._popupCaption.textContent = this._elementCard.alt;
  }
 }

export default Card;

