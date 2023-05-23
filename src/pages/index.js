import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import initialCards from "../utils/cards.js";

import {
  profileOpenButton,
  popupProfileBox,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupFullScreenBox,
  elements,
  imgAddOpenButton,
  popupAddImgBox,
  validatorConfig
} from "../utils/constants.js"

const popupPhotocardImage = new PopupWithImage(popupFullScreenBox);

popupPhotocardImage.setEventListeners();

function createCard(item){
  const card = new Card({
    data: item,
    handleCardClick: (name,link) =>{
      popupPhotocardImage.open(name,link);
    }
  },'.template');
  const cardElement = card.getCard();
  return cardElement;
};

const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) =>{
    cardsContainer.addItem(createCard(item))
  },
},elements);

cardsContainer.renderItems()

const userInfo = new UserInfo({ name: profileName, description: profileJob});

const popupProfileForm = new PopupWithForm( popupProfileBox,{
  handleFormSubmit: (input) => {
    const data = {
      name: input['name'],
      description: input['job']
    }
    userInfo.setUserInfo(data);
  }
});
popupProfileForm.setEventListeners();

profileOpenButton.addEventListener('click',() =>{
  profileValidator.resetValidation();
  popupProfileForm.open();
  const input = userInfo.getUserInfo();
  nameInput.value = input.name;
  jobInput.value = input.description;
});

const popupAddImgForm = new PopupWithForm( popupAddImgBox,{
  handleFormSubmit: (input) => {
    const data = {
      name: input['nameImg'],
      link: input['linkImg']
    }
    cardsContainer.newAddItem(createCard(data));
  }
});
popupAddImgForm.setEventListeners();

imgAddOpenButton.addEventListener('click',() =>{
  popupAddImgForm.open();
  cardValidator.resetValidation();
});

const profileValidator = new FormValidator(validatorConfig, popupProfileBox);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validatorConfig, popupAddImgBox);
cardValidator.enableValidation();
