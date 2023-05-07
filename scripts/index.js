import Card from "./Card.js";
import FormValidator from "./FormValidator.js"
import {openPopup,closePopup} from "./utils/utils.js";

const profileOpenButton = document.querySelector('.profile__popup');
const popupProfileBox = document.querySelector('.popup_profile');
const profileCloseButton = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

 profileCloseButton.addEventListener('click',() =>{
  closePopup(popupProfileBox);
 });

profileForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileBox);
 })

profileOpenButton.addEventListener('click', () =>{
  openPopup(popupProfileBox);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

const imgAddOpenButton = document.querySelector('.profile__button-plus');
const popupAddImgBox = document.querySelector('.popup_img');
const imgAddCloseButton = document.querySelector('.popup__close_img');

imgAddCloseButton.addEventListener('click',() =>{
  closePopup(popupAddImgBox);
 });

const nameInputAdd = document.querySelector('.popup__input_type_text');
const linkInputAdd = document.querySelector('.popup__input_type_link');
const elements = document.querySelector('.elements');

imgAddOpenButton.addEventListener('click', () =>{
  openPopup(popupAddImgBox);
});

function createCard(data) {
  const card = new Card(data, '.template');
  return card.getCard();
};

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  elements.append(newCard);
});
 /***добавить карточку***/
const imgAddForm = document.querySelector('.popup__form_img');

imgAddForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const elementAddNew = {
    name: nameInputAdd.value,
    link: linkInputAdd.value
  };
  elements.prepend(createCard(elementAddNew));
  imgAddForm.reset();
  closePopup(popupAddImgBox);
 })

 const popupFullScreenBox = document.querySelector('.popup-fullScreen');
 const fullScreenCloseButton = document.querySelector('.popup-fullScreen__close');

fullScreenCloseButton.addEventListener('click',() =>{
  closePopup(popupFullScreenBox);
 })

/***закрыть кликом на оверлей***/
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

popupProfileBox.addEventListener('mousedown', handleOverlayClick);
popupAddImgBox.addEventListener('mousedown', handleOverlayClick);
popupFullScreenBox.addEventListener('mousedown', handleOverlayClick);

const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profileValidator = new FormValidator(validatorConfig, popupProfileBox);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validatorConfig, popupAddImgBox);
cardValidator.enableValidation();
