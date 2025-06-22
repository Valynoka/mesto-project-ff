export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupByClickOverlay);
  document.addEventListener('keydown', closePopupByClickKey);
}

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closePopupByClickOverlay);
  document.removeEventListener('keydown', closePopupByClickKey);
}

const closePopupByClickOverlay = (evt) => {
  if(evt.target.classList.contains('popup')){
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup)
  }
}

const closePopupByClickKey = (evt) => {
  if(evt.key === 'Escape'){
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup)
  }
}