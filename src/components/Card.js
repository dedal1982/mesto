class Card{
  constructor({data,handleCardClick},templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._elementCard.src = this._link;
    this._elementCard.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._deleteButton = this._element.querySelector('.element__button-trash');
    this._cardLikeButton = this._element.querySelector('.element__button');
    this._setEventListeners()
    return this._element;
  }

  _setEventListeners(){
    this._deleteButton.addEventListener('click',this._cardDelete);
    this._cardLikeButton.addEventListener('click',this._cardLike);
    this._elementCard.addEventListener('click', () =>
      this._handleCardClick(this._name,this._link,)
    );
  }

  _cardDelete = () => {
    this._element.remove();
  }

  _cardLike = () => {
    this._cardLikeButton.classList.toggle('element__button-active');
  }
 }

export default Card;

