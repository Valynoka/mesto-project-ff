import './pages/index.css';
import {initialCards} from '../src/scripts/cards.js'
import {createCard, dellCard, likeFunc} from '../src/scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js'


const cardContainer = document.querySelector('.places__list');
//Profile changes
const editProfileBtn = document.querySelector('.profile__edit-button')//Кнопка изменения профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');//Добавляем класс открытия окна изменения профиля
const inputPopupName = document.querySelector('.popup__input_type_name');//Инпут заголовка popup
const profileTitle = document.querySelector('.profile__title');//Заголовок профиля
const inputPopupDescription = document.querySelector('.popup__input_type_description');//Инпут описания popup
const profileDescription = document.querySelector('.profile__description');//Описание профиля
//Close profile
const closePopup = popupTypeEdit.querySelector('.popup__close');//Кнопка закрытия
//Submit profile
const profileForm = popupTypeEdit.querySelector('.popup__form');//Форма добавления информации в профиль
const buttonPopupSubmit = document.querySelector('.popup__button');//Кнопка добавления данных в профиль
//Cards changes
const addCardBtn = document.querySelector('.profile__add-button')//Кнопка открытия popup карточек
const inputPopupCardName = document.querySelector('.popup__input_type_card-name');//Инпут заколовка карточки popup
const inputPopupCardLink = document.querySelector('.popup__input_type_url');//Инпут ссылки на картинку
const popupTypeCard = document.querySelector('.popup_type_new-card');//Добавляем класс открытия добавления карточек
//Close card popup
const closePopupCard = popupTypeCard.querySelector('.popup__close');//Кнопка закрытия
//Submit profile
const newCardForm = popupTypeCard.querySelector('.popup__form');//Форма добавления информации в профиль
//Zoom card
const popupImg = document.querySelector('.popup_type_image');
const popupImgClose = popupImg.querySelector('.popup__close');//Кнопка закрытия popup для картинок
const popupImgDisplay = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');
//Анимация для всех popup
const popupList = document.querySelectorAll('.popup')

//Открываем окно для профиля
const profileOpen = (evt) => {
  //Передаем данные из инпутов popup в профиль
  inputPopupName.value = profileTitle.textContent;
  inputPopupDescription.value = profileDescription.textContent;
  openModal(evt)
}

//Добавляем класс is-open для popup_type_edit
editProfileBtn.addEventListener('click', () => profileOpen(popupTypeEdit));

//Закрываем окно профиля
const profileClose = (evt) => {
  closeModal(evt)
}

closePopup.addEventListener('click', () => profileClose(popupTypeEdit));

//Добавляем данные в профиль
const profileEditSubmit = (evt) => {
  evt.preventDefault();
  //Данные из инпутов переписываем в профиль
  profileTitle.textContent = inputPopupName.value;
  profileDescription.textContent = inputPopupDescription.value;
  closeModal(popupTypeEdit)
}

profileForm.addEventListener('submit', profileEditSubmit);

//Открываем окно для карточек
const cardPopupOpen = (evt) => {
  openModal(evt)
}
addCardBtn.addEventListener('click', () => cardPopupOpen(popupTypeCard))

//Закрываем окно профиля с карточками
const cardPopupClose = (evt) => {
  closeModal(evt)
}

closePopupCard.addEventListener('click', () => cardPopupClose(popupTypeCard));

//Добавляем новую карточку
const profileNewCardSubmit = (evt) => {
  evt.preventDefault();
  cardContainer.prepend(createCard(inputPopupCardLink.value, inputPopupCardName.value, dellCard, likeFunc, imagePopup));
  newCardForm.reset();
  closeModal(popupTypeCard)
}

newCardForm.addEventListener('submit', profileNewCardSubmit);

//Добавляем popup для изображения
const imagePopup = (evt, title) => {
  popupImgDisplay.src = evt.target.src;
  popupImgDisplay.alt = evt.target.alt;
  popupImgCaption.textContent = title;
  openModal(popupImg);
}

//Закрываем popup для изображения
const imgPopupClose = (evt) => {
  closeModal(evt)
}

popupImgClose.addEventListener('click', () => imgPopupClose(popupImg));

//Добавляем анимацию для всех popup - перебирайем все элементы имеющие popup и добавляем необходимый класс
popupList.forEach((item) => {
  item.classList.add('popup_is-animated');
})

initialCards.forEach((item) => {
  cardContainer.append(createCard(item.link, item.name, dellCard, likeFunc, imagePopup));
})
