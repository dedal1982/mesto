/*открыть  popup*/
export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

/***закрыть кликом на Esc***/
export function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

/*закрыть popup*/
export function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
 }
