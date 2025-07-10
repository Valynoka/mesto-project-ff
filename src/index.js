import './pages/index.css';
import {createCard, dellCard, likeCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js'
import { enableValidation, clearVaValidation } from './scripts/validation.js';
import { 
  getProfileFromServer,
  getAllCardsFromServer,
  editProfileOnServer,
  addNewCardOnServer,
  addNewAvatarOnServer
  } from './scripts/api.js';

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
let userID = null;

const obj = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

//Закрытие окон
document.querySelectorAll('.popup__close').forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', closeModal(popup))
});

//Плавные карточки
popupList.forEach((popup) => {
  popup.classList.add('popup_is-animated')
});

//Управляем состоянием загрузки
const renderLoader = (isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
};

//Управление popup с картинками
export const handleImageClick = (cardData) => {
  imagePopupPicture.src = cardData.link;
  imagePopupPicture.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openModal(imageZoomPopup);
}

//Функция обработки редактиврования профиля
const editProfileFormSubmit = (evt) => {
  evt.preventDefault();
  //Размещаем идикатор загруки на кнопке внутри формы
  renderLoader(true, profileEditBtn);
  //Отправляем данные на сервер
  editProfileOnServer(
    profileInputPopupName.value,
    profileInputPopupDescription.value)
    .then((userData) => {
      //После того, как данные будут отправленны на сервер необходимо, чтобы они вернулись обратно и отрисовались
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profilePopupEdit)
    })
  //Обрабатываем ошибки
  .catch((err) => {
    console.log(`Упс...${err}`);
  })
  //Необходимо отобразить, что загрузка закончена и вернуть кнопку в обычное внешнее состояние
  .finally(() => {renderLoader(false, profileEditBtn)})
};

//После того как сделали функцию для редактиврования профиля, может открывать окно
const openProfilePopup = () => {
  openModal(profilePopupEdit);
  profileInputPopupName.value = profileTitle.textContent;
  profileInputPopupDescription.value = profileDescription.textContent;
  clearVaValidation(profileForm, obj)
}

//Функция обновления аватара
const addNewAvatar = (evt) => {
  evt.preventDefault();
  //Аналогично демотстрируем позьзователю как происходит загрузка + конец функции
  renderLoader(true, avatarPopupButtonSubmit);
  //Отправляем данные на сервер
  addNewAvatarOnServer(avatarPopupInput.value)
    .then((newAvatar) => {
      avatarPopup.style.backgroundImage = `url(${newAvatar.avatar})`;
      closeModal(avatarPopupTypeEdit);
      avatarPopupForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoader(false, avatarPopupButtonSubmit)
    });
}

//Функция добавления новой карточки на сервер
const addNewCard = (evt) => {
  evt.preventDefault();
  //Аналогично вызываем рендер конопки
  renderLoader(true, newCardSaveButton);
  //Отправляем данные на сервер, передавая значения, которые мы пропишем в inpit формы
  addNewCardOnServer(
    newCardInputCardName.value,
    newCardInputLink.value)
    .then((newCard) => {
      //после того, как мы получим ответ от сервера, мы должны отрисовать карточку
      cardContainer.prepend(createCard(newCard, userID));
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`)
    })
    //Аналогичные действия, как и ранее возвращаем кнопку
    .finally(() => {
      renderLoader(false, newCardSaveButton);
      //убираем валидацию, так как окно закрывается
      clearVaValidation(newCardForm, obj)
    })
}

//Вынесем отдельно случатель форм и кнопок, чтобы были в одном месте
//Профиль пользователя
//Слушательно для открытия формы профиля для редактирования
profileEditBtn.addEventListener('click', openProfilePopup);
//Слушатель на форму профиля для отправки данных
profileForm.addEventListener('submit', editProfileFormSubmit);
//Закрываем
profileClosePopup.addEventListener('click', () =>closeModal(profilePopupEdit));

//Открываем окно для обновления авы
avatarPopup.addEventListener('click', () => {
  avatarPopupForm.reset();
  clearVaValidation(avatarPopupForm, obj);
  openModal(avatarPopupTypeEdit)});
avatarPopupClose.addEventListener('click', () => closeModal(avatarPopupTypeEdit));
//Слушатель на форму профиля для отправки данных
avatarPopupForm.addEventListener('submit', addNewAvatar);

//Открываем окно для добавления карточки
newCardAddBtn.addEventListener('click', () => {
  newCardForm.reset();
  clearVaValidation(newCardForm, obj);
  openModal(newCardPopup)})
//Окно открыли - теперь добавим слушатель на форму, чтобы отправить нашу картинку
newCardForm.addEventListener('submit', addNewCard)
//Закрываем
newCardClosePopup.addEventListener('click', () => closeModal(newCardPopup));

//Закрываем наши увеличевабщиеся картинки
imageZoomPopupClose.addEventListener('click', () => closeModal(imageZoomPopup));

enableValidation(obj);

Promise.all([getProfileFromServer(), getAllCardsFromServer()])
  .then(([userProfile, cardData]) => {
    userID = userProfile._id;
    profileTitle.textContent = userProfile.name;
    profileDescription.textContent = userProfile.about;
    avatarPopup.style.backgroundImage = `url(${userProfile.avatar})`;
    cardData.forEach((card) => cardContainer.prepend(createCard(card, userID)))
  })
  .catch((err) => {
    console.log('Ошибка при закгрузке', err);
  })
