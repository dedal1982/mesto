import {openPopup} from "./utils/utils.js";

class Card{
  constructor(data,templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
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
    const popupFull = document.querySelector('.popup-fullScreen')
    openPopup(popupFull)
    const popupImg = popupFull.querySelector('.popup-fullScreen__img');
    const popupCaption = popupFull.querySelector('.popup-fullScreen__caption');
    popupImg.src = this._elementCard.src;
    popupImg.alt = this._elementCard.alt;
    popupCaption.textContent = this._elementCard.alt;
  }
 }

export default Card;

