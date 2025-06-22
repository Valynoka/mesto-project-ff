export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', removeClassOpenedOverlay);
  document.addEventListener('keydown', removeClassOpenedKey);
}

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', removeClassOpenedOverlay);
  document.removeEventListener('keydown', removeClassOpenedKey);
}

const removeClassOpenedOverlay = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  if(evt.target.classList.contains('popup')){
    closeModal(popup)
  }
}

const removeClassOpenedKey = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  if(evt.key === 'Escape'){
    closeModal(popup)
  }
}