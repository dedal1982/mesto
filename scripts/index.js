const profileOpenButton = document.querySelector('.profile__popup');
const popupProfileBox = document.querySelector('.popup_profile');
const profileCloseButton = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

/*открыть  popup*/
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}
/*закрыть popup*/
 function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
 }
 function disabledSubmitButton() {
  const buttonsSubmit = document.querySelectorAll('.popup__submit');
  buttonsSubmit.forEach((button) => {
    button.classList.add('popup__submit_disabled');
    button.setAttribute("disabled", true);
  })
};

 profileCloseButton.addEventListener('click',() =>{
  closePopup(popupProfileBox);
 });

profileForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  disabledSubmitButton();
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
const itemTemplate = document.querySelector('.template').content;
const elements = document.querySelector('.elements');

const popupFullScreenBox = document.querySelector('.popup-fullScreen');
const fullScreenCloseButton = document.querySelector('.popup-fullScreen__close');
const elementFullScreenImg = document.querySelector('.popup-fullScreen__img');
const elementFullScreenCaption = document.querySelector('.popup-fullScreen__caption');

imgAddOpenButton.addEventListener('click', () =>{
  openPopup(popupAddImgBox);
});

/***создать карточку***/
function createCard(item) {
  const htmlElement = itemTemplate.cloneNode(true);
  const cardImage = htmlElement.querySelector('.element__img');
  const imageText = htmlElement.querySelector('.element__name');
  const cardDelete = htmlElement.querySelector('.element__button-trash');
  const cardLike = htmlElement.querySelector('.element__button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  imageText.textContent = item.name;

/***удалить карточку***/
  cardDelete.addEventListener('click', function () {
    const deleteItem = cardDelete.closest('.element');
    deleteItem.remove();
  });
/***лайк***/
  cardLike.addEventListener('click', function (event) {
    const like = event.target.closest('.element__button');
    like.classList.toggle('element__button-active');
  });
/***увеличить картинку***/
  cardImage.addEventListener('click', function (event) {
    openPopup(popupFullScreenBox);
    elementFullScreenImg.src = cardImage.src;
    elementFullScreenImg.alt = cardImage.alt;
    elementFullScreenCaption.textContent = cardImage.alt;
  });
  return htmlElement;
};

/***перебор массива***/
initialCards.forEach(function (item) {
  const elementCreate = createCard(item);
  elements.prepend(elementCreate);
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
  disabledSubmitButton();
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

