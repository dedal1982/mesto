import { openPopup } from "./index.js";


class Card{
  constructor(data) {
    this._data = data;
    this._template = document.querySelector('.template').content;
  }
  _cardDelete = () => {
    this._card.remove();
  }
  _cardLike = () => {
    this._cardLikeButton.classList.toggle('element__button-active');
  }

  _cardFullOpenImg = () =>{
    this._popupFull = document.querySelector('.popup-fullScreen')
    openPopup(this._popupFull)
    this._popupImg = document.querySelector('.popup-fullScreen__img');
    this._popupCaption = document.querySelector('.popup-fullScreen__caption');
    this._popupImg.src = this._elementCard.src;
    this._popupImg.alt = this._elementCard.alt;
    this._popupCaption.textContent = this._elementCard.alt;
  }

  _createCard = (data) => {
    this._card = this._template.cloneNode(true).children[0];
    this._elementCard = this._card.querySelector('.element__img');
    this._elementCard.src = data.link;
    this._elementCard.alt = data.name;
    this._card.querySelector('.element__name').textContent = data.name;
    this._elementCard.addEventListener('click', this._cardFullOpenImg);
    this._card.querySelector('.element__button-trash').addEventListener('click', this._cardDelete);
    this._cardLikeButton = this._card.querySelector('.element__button');
    this._cardLikeButton.addEventListener('click', this._cardLike);

  }

  getCard = (data) => {
    if (!this._card){
      this._createCard(data)
    }
    return this._card;
  }
 }

export default Card;

