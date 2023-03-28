const buttonPopupOpen = document.querySelector('.profile__popup');
const popupBox = document.querySelector('.popup');
const buttonPopupClose = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


/*открыть  popup*/
function openPopup(popup){
  popup.classList.add('popup_opened');
}
/*закрыть popup*/
 function closePopup(popup){
  popup.classList.remove('popup_opened');
 }

 buttonPopupClose.addEventListener('click',() =>{
  closePopup(popupBox);
 });

 popupForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupBox);
 })

 buttonPopupOpen.addEventListener('click', () =>{
  openPopup(popupBox);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
/***массив***/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addButton = document.querySelector('.profile__button-plus');
const addBox = document.querySelector('.popup_img');
const closeBox = document.querySelector('.popup__close_img');

closeBox.addEventListener('click',() =>{
  closePopup(addBox);
 });

addButton.addEventListener('click', () =>{
  openPopup(addBox);
  addNameInput.value = '';
  addLinkInput.value = '';
})

const itemTemplate = document.querySelector('.template').content;
const elements = document.querySelector('.elements');



initialCards.forEach(renderItem);



function renderItem(item){
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.element__img').src = item.link;
  htmlElement.querySelector('.element__img').alt = item.name;
  htmlElement.querySelector('.element__name').textContent = item.name;
  htmlElement.querySelector('.element__button-trash').addEventListener('click',handleDelete);
  htmlElement.querySelector('.element__button').addEventListener('click',handleLike);

  elements.prepend(htmlElement);
}

function handleDelete(event){
  const card = event.target.closest('.element');
  card.remove();
}
 function handleLike(event){
  const like = event.target.closest('.element__button');
  like.classList.toggle('element__button-active');
 }

 /***добавить карточку***/
 const ImgPopupForm = document.querySelector('.popup__form_img');

 function addCard(){
  const card = itemTemplate.cloneNode(true);
  card.querySelector('.element__name').textContent = addNameInput.value;
  card.querySelector('.element__img').src = addLinkInput.value;
  card.querySelector('.element__img').alt = addNameInput.value;
  card.querySelector('.element__button-trash').addEventListener('click',handleDelete);
  elements.prepend(card);
}

const addNameInput = document.querySelector('.popup__input_img_type_name');
const addLinkInput = document.querySelector('.popup__input_type_link');

ImgPopupForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  addCard();
  closePopup(addBox);
 })
