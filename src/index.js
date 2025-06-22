import './pages/index.css';
import {initialCards} from '../src/scripts/cards.js'
import {createCard, dellCard, likeFunc} from '../src/scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js'


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
//Cards changes
const newCardPopup = document.querySelector('.popup_type_new-card');//Добавляем класс открытия добавления карточек
const newCardAddBtn = document.querySelector('.profile__add-button')//Кнопка открытия popup карточек
const newCardInputCardName = newCardPopup.querySelector('.popup__input_type_card-name');//Инпут заколовка карточки popup
const newCardInputLink = newCardPopup.querySelector('.popup__input_type_url');//Инпут ссылки на картинку
//Close card popup
const newCardClosePopup = newCardPopup.querySelector('.popup__close');
//Submit profile
const newCardForm = newCardPopup.querySelector('.popup__form');//Форма добавления информации в профиль
//Zoom card
const imageZoomPopup = document.querySelector('.popup_type_image');
const imageZoomPopupClose = imageZoomPopup.querySelector('.popup__close');
const imagePopupPicture = imageZoomPopup.querySelector('.popup__image');
const imagePopupCaption = imageZoomPopup.querySelector('.popup__caption');
//Анимация для всех popup
const popupList = document.querySelectorAll('.popup')

//Закрытие всех оконn - в комментарии было, как я понял, предложено несколько вариантов
//поэтому я выбрал дать наименование переменным по строго по блокам. 
// const closePopup = document.querySelectorAll('.popup__close')
// closePopup.forEach((item) => {
//   item.addEventListener('click', (evt) => {
//     closeModal(evt)
//   })
// })


//Открываем окно для профиля
const openProfilePopup = (evt) => {
  //Передаем данные из инпутов popup в профиль
  profileInputPopupName.value = profileTitle.textContent;
  profileInputPopupDescription.value = profileDescription.textContent;
  openModal(evt)
}

//Добавляем класс is-open для popup_type_edit
profileEditBtn.addEventListener('click', () => openProfilePopup(profilePopupEdit));

//Закрываем окно профиля
const closeProfilePopup = (evt) => {
  closeModal(evt)
}

profileClosePopup.addEventListener('click', () => closeProfilePopup(profilePopupEdit));

//Редактируем данные в профиль
const editDataInProfile = (evt) => {
  evt.preventDefault();
  //Данные из инпутов переписываем в профиль
  profileTitle.textContent = profileInputPopupName.value;
  profileDescription.textContent = profileInputPopupDescription.value;
  closeModal(profilePopupEdit)
}

profileForm.addEventListener('submit', editDataInProfile);

//Открываем окно для карточек
const openNewCardPopup = (evt) => {
  openModal(evt)
}
newCardAddBtn.addEventListener('click', () => openNewCardPopup(newCardPopup))

//Закрываем окно профиля с карточками
const closeNewCardPopup = (evt) => {
  closeModal(evt)
}

newCardClosePopup.addEventListener('click', () => closeNewCardPopup(newCardPopup));

//Добавляем новую карточку
const addNewCard = (evt) => {
  evt.preventDefault();
  cardContainer.prepend(createCard(newCardInputLink.value, newCardInputCardName.value, dellCard, likeFunc, displayImagePopup));
  newCardForm.reset();
  closeModal(newCardPopup)
}

newCardForm.addEventListener('submit', addNewCard);

//Добавляем popup для изображения
const displayImagePopup = (cardLink, cardName) => {
  imagePopupPicture.src = cardLink;
  imagePopupPicture.alt = cardName;
  imagePopupCaption.textContent = cardName;
  openModal(imageZoomPopup);
}

//Закрываем popup для изображения
const imgPopupClose = (evt) => {
  closeModal(evt)
}

imageZoomPopupClose.addEventListener('click', () => imgPopupClose(imageZoomPopup));

//Добавляем анимацию для всех popup - перебирайем все элементы имеющие popup и добавляем необходимый класс
popupList.forEach((item) => {
  item.classList.add('popup_is-animated');
})

initialCards.forEach((item) => {
  cardContainer.append(createCard(item.link, item.name, dellCard, likeFunc, displayImagePopup));
})
