import Card from "./Card.js";
import FormValidator from "./FormValidator.js"


const profileOpenButton = document.querySelector('.profile__popup');
const popupProfileBox = document.querySelector('.popup_profile');
const profileCloseButton = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

/*открыть  popup*/
export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}
/*закрыть popup*/
 function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
 }
 function disabledSubmitButton(popup) {
  const button = popup.querySelector(".popup__submit");
  button.classList.add("popup__submit_disabled");
  button.setAttribute("disabled", true);
}
 profileCloseButton.addEventListener('click',() =>{
  closePopup(popupProfileBox);
 });

profileForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  disabledSubmitButton(popupProfileBox);
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

const popupFullScreenBox = document.querySelector('.popup-fullScreen');
const fullScreenCloseButton = document.querySelector('.popup-fullScreen__close');

imgAddOpenButton.addEventListener('click', () =>{
  openPopup(popupAddImgBox);
});

/***перебор массива***/
initialCards.forEach( (data) => {
  const cardNew = new Card();
  const card = cardNew.getCard(data);
  elements.prepend(card);
});

 /***добавить карточку***/
const imgAddForm = document.querySelector('.popup__form_img');

imgAddForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const elementAddNew = {
    name: nameInputAdd.value,
    link: linkInputAdd.value
  };
  const cardNewAdd = new Card();
  elements.prepend(cardNewAdd.getCard(elementAddNew));
  imgAddForm.reset();
  disabledSubmitButton(popupAddImgBox);
  closePopup(popupAddImgBox);
 })

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

/***закрыть кликом на Esc***/
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

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
