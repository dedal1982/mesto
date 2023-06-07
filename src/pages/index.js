import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from '../components/PopupWithConfirm';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import loading from '../utils/utils.js';

import {
  profileOpenButton,
  popupProfileBox,
  popupAvatarBox,
  avatarOpenButton,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  profileAvatar,
  popupFullScreenBox,
  elements,
  imgAddOpenButton,
  popupAddImgBox,
  validatorConfig,
  popupDelete
} from "../utils/constants.js"

let userId = 0;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'f4edfbbb-8d40-44f7-8679-ccd088709afa',
    'Content-Type': 'application/json'
  }
})

Promise.all([ api.getDataUser(), api.getInitialsCards()])
  .then(([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    cardsContainer.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  })

//открытие карточки в отдельном окне
const popupPhotocardImage = new PopupWithImage(popupFullScreenBox);
popupPhotocardImage.setEventListeners();

//открытие попапа подтверждения удаления
const popupWithConfirm = new PopupWithConfirm(popupDelete);
popupWithConfirm.setEventListeners();

// Функция для создания карточки
function createCard(data) {
  const card = new Card({
    data,
    handleCardClick: (name, link) => {
      popupPhotocardImage.open(name, link);
    },
    handleDeleteClick: () => {
			popupWithConfirm.open();
			popupWithConfirm.submitCallback(() => {
				loading(popupDelete, 'Удаление...');
				api.deleteCard(card.getId())
					.then(() => {
						card.deleteCard();
						popupWithConfirm.close();
					})
					.catch((err) => {
						console.log(`deleteCard - ошибка: ${err}`);
					})
				.finally(() => {
					loading(popupDelete, 'Да');
				})
			})
		},
    handleSetLike: (cardId) => {
			api.setLike(cardId)
				.then((data) => {
					card.handleLike(data);
				})
				.catch((err) => {
					console.log(`handleSetLike - ошибка: ${err}`);
				});
		},
		handleDeleteLike: (cardId) => {
			api.deleteLike(cardId)
				.then((data) => {
					card.handleLike(data);
				})
				.catch((err) => {
					console.log(`handleDeleteLike - ошибка: ${err}`);
				});
		},
  }, '.template', userId);

  return card.getCard();
};

// Перебириаем массив и загружаем карточки с сервера
const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item))
  }
}, elements);


//редактирование профиля
const userInfo = new UserInfo({selectorUserName:profileName, selectorUserAbout: profileJob, selectorUserAvatar: profileAvatar,});

const popupProfileForm = new PopupWithForm(popupProfileBox, {
	handleFormSubmit: (data) => {
		loading(popupProfileBox, 'Cохранение...');
		api.setUserData(data)
			.then((res) => {
				userInfo.setUserInfo(res);
        popupProfileForm.close();
			})
			.catch((err) => {
				console.log(`setDataUser - ошибка: ${err}`);
			})
			.finally(() => {
				loading(popupProfileBox, 'Сохранить');
			})
	}
})
popupProfileForm.setEventListeners();

profileOpenButton.addEventListener('click',() =>{
  profileValidator.resetValidation();
  popupProfileForm.open();
  const userInfoText = userInfo.getUserInfo();
	nameInput.value = userInfoText.name;
	jobInput.value = userInfoText.about;

});

//редактирование аватара
const popupAvatarForm = new PopupWithForm(popupAvatarBox, {
	handleFormSubmit: (data) => {
		loading(popupAvatarBox, 'Сохранение...');
		api.setUserAvatar(data)
			.then((res) => {
				userInfo.setUserInfo(res)
				popupAvatarForm.close();
			})
		.catch((err) => {
			console.log(`setUserAvatar - ошибка: ${err}`);
		})
		.finally(() => {
			loading(popupAvatarBox, 'Сохранить')
		})
	}
})
popupAvatarForm.setEventListeners();

avatarOpenButton.addEventListener('click', () => {
	avatarValidator.resetValidation();
	popupAvatarForm.open();
});

//добавление новой карточки
const popupAddForm = new PopupWithForm(popupAddImgBox, {
	handleFormSubmit: (data) => {
		loading(popupAddImgBox, 'Сохранение...');
		api.addNewPhotocard(data.nameImg,data.linkImg)
			.then((res) => {
				cardsContainer.newAddItem(createCard(res));
        popupAddForm.close();
		})
		.catch((err) => {
			console.log(`addNewCard - ошибка: ${err}`);
		})
		.finally(() => {
			loading(popupAddImgBox, 'Создать');
		})
	}
})
popupAddForm.setEventListeners();

imgAddOpenButton.addEventListener('click', () => {
	cardValidator.resetValidation();
	popupAddForm.open();
});


/*валидация редактирования профиля*/
const profileValidator = new FormValidator(validatorConfig, popupProfileBox);
profileValidator.enableValidation();
/*валидация добавления карточки*/
const cardValidator = new FormValidator(validatorConfig, popupAddImgBox);
cardValidator.enableValidation();
/*валидация изменения аватара*/
const avatarValidator = new FormValidator(validatorConfig, popupAvatarBox );
avatarValidator.enableValidation();
