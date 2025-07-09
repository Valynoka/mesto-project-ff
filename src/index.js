import './pages/index.css';
import {createCard, dellCard, likeFunc} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js'
import { addNewAvatarOnServer, editProfileOnServer ,addNewCardOnServer, getAllProfilesFromServer, getAllCardsFromServer } from './scripts/api.js';
import { enableValidation, clearVaValidation } from './scripts/validation.js'

const cardContainer = document.querySelector('.places__list');
//Profile changes
const profileEditBtn = document.querySelector('.profile__edit-button')//Кнопка изменения профиля
const profilePopupEdit = document.querySelector('.popup_type_edit');//Добавляем класс открытия окна изменения профиля
const profileInputPopupName = profilePopupEdit.querySelector('.popup__input_type_name');//Инпут заголовка popup
const profileTitle = document.querySelector('.profile__title');//Заголовок профиля
const profileInputPopupDescription = document.querySelector('.popup__input_type_description');//Инпут описания popup
const profileDescription = document.querySelector('.profile__description');//Описание профиля
//Close profile
const profileClosePopup = profilePopupEdit.querySelector('.popup__close');//Кнопка закрытия изменения профиля
//Submit profile
const profileForm = profilePopupEdit.querySelector('.popup__form');//Форма добавления информации в профиль
const profileButton = profilePopupEdit.querySelector('.popup__button')
//Cards changes
const newCardPopup = document.querySelector('.popup_type_new-card');//Добавляем класс открытия добавления карточек
const newCardAddBtn = document.querySelector('.profile__add-button')//Кнопка открытия popup карточек
const newCardInputCardName = newCardPopup.querySelector('.popup__input_type_card-name');//Инпут заколовка карточки popup
const newCardInputLink = newCardPopup.querySelector('.popup__input_type_url');//Инпут ссылки на картинку
const newCardSaveButton = newCardPopup.querySelector('.popup__button')
const newCardClosePopup = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('.popup__form');//Форма добавления информации в профиль
//Zoom card
const imageZoomPopup = document.querySelector('.popup_type_image');
const imageZoomPopupClose = imageZoomPopup.querySelector('.popup__close');
const imagePopupPicture = imageZoomPopup.querySelector('.popup__image');
const imagePopupCaption = imageZoomPopup.querySelector('.popup__caption');
//Анимация для всех popup
const popupList = document.querySelectorAll('.popup');
//Change avatar
const avatarPopup = document.querySelector('.profile__image');//Кнопка-картинка для открытия popup и изменения аватара
const avatarPopupTypeEdit = document.querySelector('.popup_type_edit_avatar');//
const avatarPopupClose = avatarPopupTypeEdit.querySelector('.popup__close');//Кнопка закрытия popup смены аватара
const avatarPopupForm = avatarPopupTypeEdit.querySelector('.popup__form');
const avatarPopupInput = avatarPopupTypeEdit.querySelector('.popup__input');
const avatarPopupButtonSubmit = avatarPopupTypeEdit.querySelector('.popup__button');
let userId = null;

const obj = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

const editAvatar = (evt) => {
  evt.preventDefault();
  avatarPopupButtonSubmit.textContent = 'Сохранение...'
  addNewAvatarOnServer(avatarPopupInput.value)
    .then((avatar) => {
      avatarPopup.setAttribute('style', `background-image: url(${avatar.value});`)
      avatarPopupForm.reset();
      clearVaValidation(avatarPopupTypeEdit, obj)
      closeModal(avatarPopupTypeEdit);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      avatarPopupButtonSubmit.textContent = 'Сохранить'
    })
};

const openProfilePopup = () => {
  openModal(profilePopupEdit)
  profileInputPopupName.value = profileTitle.textContent;
  profileInputPopupDescription.value = profileDescription.textContent;
  clearVaValidation(profilePopupEdit, obj);
}

const editProfile = (evt) => {
  evt.preventDefault();
  profileButton.textContent = 'Сохраненеие...'
  editProfileOnServer(profileInputPopupName.value, profileInputPopupDescription.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      // clearVaValidation(profilePopupEdit, obj);
      closeModal(profilePopupEdit);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {profileButton.textContent = 'Сохранить'})
}

const addNewCard = (evt) => {
  evt.preventDefault();
  newCardSaveButton.textContent = 'Сохраненеие...'
  addNewCardOnServer(newCardInputCardName.value, newCardInputLink.value)
    .then((cardData) => {
      cardContainer.prepend(createCard(cardData.name, cardData.link, cardData._id, cardData.likes, cardData.owner._id, userId, config, dellCard, likeFunc, displayImagePopup));
      newCardForm.reset();
      clearVaValidation(newCardPopup, obj);
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {newCardSaveButton.textContent = 'Сохранить'})
}

//Обработчики кнопок
//Avatar
avatarPopup.addEventListener('click', () => {clearVaValidation(avatarPopupTypeEdit, obj), openModal(avatarPopupTypeEdit)});
avatarPopupClose.addEventListener('click', () => closeModal(avatarPopupTypeEdit));
avatarPopupForm.addEventListener('submit', editAvatar);

//Profiles
profileEditBtn.addEventListener('click', openProfilePopup);
profileClosePopup.addEventListener('click', () =>closeModal(profilePopupEdit));
profileForm.addEventListener('submit', editProfile);
//New cards
newCardAddBtn.addEventListener('click', () => {clearVaValidation(newCardPopup, obj), openModal(newCardPopup)});
newCardClosePopup.addEventListener('click', () => closeModal(newCardPopup));
newCardForm.addEventListener('submit', addNewCard);
imageZoomPopup.addEventListener('click', displayImagePopup);
imageZoomPopupClose.addEventListener('click', () => closeModal(imageZoomPopup));

//Плавные карточки
popupList.forEach((popup) => {
  popup.classList.add('popup_is-animated')
});

//Увеличение карточек
export const displayImagePopup = (cardName, cardLink) => {
  openModal(imageZoomPopup);
  imagePopupPicture.src = cardLink;
  imagePopupPicture.name = cardName;
  imagePopupCaption.textContent = cardName;
}

enableValidation(obj);

// Получаем все карточки + не пойму как получить лайки
const showDataOnServer = [getAllProfilesFromServer(), getAllCardsFromServer()];

Promise.all(showDataOnServer)
  .then(([userData, cardsData]) => {
    userId = userData._id;
    avatarPopup.setAttribute('style', `background-image: url(${userData.avatar});`)
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    cardsData.forEach((cardData) => {
      cardContainer.prepend(createCard(cardData.name, cardData.link, userId));
    })
  })
  .catch((err) => {
    console.log(err);
  })
