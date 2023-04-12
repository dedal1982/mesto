const buttonPopupOpen = document.querySelector('.profile__popup');
const popupProfileBox = document.querySelector('.popup_profile');
const buttonPopupProfileClose = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupForm = document.querySelector('.popup__form_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

/*открыть  popup*/
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}
/*закрыть popup*/
 function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
 }

 buttonPopupProfileClose.addEventListener('click',() =>{
  closePopup(popupProfileBox);
 });

popupForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileBox);
 })

buttonPopupOpen.addEventListener('click', () =>{
  openPopup(popupProfileBox);
  nameInput.value = '';
  jobInput.value = '';
})

const buttonAdd = document.querySelector('.profile__button-plus');
const boxAddImg = document.querySelector('.popup_img');
const boxCloseImg = document.querySelector('.popup__close_img');

boxCloseImg.addEventListener('click',() =>{
  closePopup(boxAddImg);
 });

const nameInputAdd = document.querySelector('.popup__input_type_text');
const linkInputAdd = document.querySelector('.popup__input_type_link');
const itemTemplate = document.querySelector('.template').content;
const elements = document.querySelector('.elements');

const popupFullScreen = document.querySelector('.popup-fullScreen');
const popupFullScreenClose = document.querySelector('.popup-fullScreen__close');
const elementFullScreenImg = document.querySelector('.popup-fullScreen__img');
const elementFullScreenCaption = document.querySelector('.popup-fullScreen__caption');

/***создать карточку***/
function createCard(item) {
  const htmlElement = itemTemplate.cloneNode(true);
  const imageName = htmlElement.querySelector('.element__img');
  const imageAlt = htmlElement.querySelector('.element__img');
  const imageText = htmlElement.querySelector('.element__name');
  const cardDelete = htmlElement.querySelector('.element__button-trash');
  const cardLike = htmlElement.querySelector('.element__button');
  const cardFullScreen = htmlElement.querySelector('.element__img');

  imageName.src = item.link;
  imageAlt.alt = item.name;
  imageText.textContent = item.name;

  buttonAdd.addEventListener('click', () =>{
    openPopup(boxAddImg);
    nameInputAdd.value = '';
    linkInputAdd.value = '';
  });
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
  cardFullScreen.addEventListener('click', function (event) {
    const elementImg = event.target.closest('.element__img');
    openPopup(popupFullScreen);
    elementFullScreenImg.src = elementImg.src;
    elementFullScreenImg.alt = elementImg.alt;
    elementFullScreenCaption.textContent = elementImg.alt;
  });
  return htmlElement;
};

/***перебор массива***/
initialCards.forEach(function (item) {
  const elementCreate = createCard(item);
  elements.prepend(elementCreate);
});

 /***добавить карточку***/
const popupFormImg = document.querySelector('.popup__form_img');

popupFormImg.addEventListener('submit',(event)=>{
  event.preventDefault();
  const elementAddNew = {
    name: nameInputAdd.value,
    link: linkInputAdd.value
  };
  elements.prepend(createCard(elementAddNew));
  closePopup(boxAddImg);
 })

popupFullScreenClose.addEventListener('click',() =>{
  closePopup(popupFullScreen);
 })

/***закрыть кликом на оверлей***/
function closeClickOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

popupProfileBox.addEventListener('click', closeClickOverlay);
boxAddImg.addEventListener('click', closeClickOverlay);
popupFullScreen.addEventListener('click', closeClickOverlay);

/***закрыть кликом на Esc***/
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

