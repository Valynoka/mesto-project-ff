import { dellNewCardFromServer, addLikeOnCard, dellLikeOnCard } from "./api";
import { handleImageClick } from '../index.js';

export const createCard = (cardData, userID) => {
  const cardTamplate = document.querySelector('#card-template').content;
  //Клонируем элемент листа, который нужно будет наполнить
  const cardElement = cardTamplate.querySelector('.places__item').cloneNode(true);
  //Находим все разделы и записываем их в переменные
  const cardImage = cardElement.querySelector('.card__image');
  const dellButton = cardElement.querySelector('.card__delete-button');
  const cartTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  //Картинка имеет ссылку и описание, необхоимо присвоить им эти значения
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cartTitle.textContent = cardData.name;

   //Контейнер для наших лайков
  const likeCount = cardElement.querySelector('.card__like-count');
  likeCount.textContent = cardData.likes.length;
  //Добавим обработчик на добавление и удаление лайков
  likeButton.addEventListener('click', () => {
    //Записываем в переменную, что если кнопка активна
    const likeOnCard = likeButton.classList.contains('card__like-button_is-active');
    //то лайк мы удалим
    if (likeOnCard) {
      dellLikeOnCard(cardData._id)
        .then((res) => {
          likeCount.textContent = res.likes.length;
          likeButton.classList.remove('card__like-button_is-active');
        })
        .catch((err) => {
          console.log(err)
        })
        //в другом же случае наоборот поставим и посчитаем лайки
    } else {
      addLikeOnCard(cardData._id)
        .then((res) => {
          likeCount.textContent = res.likes.length;
          likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })



  //Повесили на кнопку обработчик с функцией удаления карточек
  dellButton.addEventListener('click', () => dellCard(cardData, userID))
  //Кнопака удаления должна быть только у наших карточек - сравним по id карточку-автора и заблокируем кнопку
  const isOwner = cardData.owner && cardData.owner._id === userID;
  //Кнопка только на наших карточках
  if (!isOwner) {
    dellButton.style.display = 'none';
  }

  //Обработчик клика по картинке - увеличение
  cardImage.addEventListener('click', () => {
    handleImageClick({name: cardData.name, link: cardData.link})
  })

  return cardElement;
}

//Функция удаления карточек с сервера
const dellCard = (cardData) => {
  dellNewCardFromServer(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    })
};

//Функция добавления лайков
export const likeCard = (cardData, likeButton, likeCount) => {
  if (likeButton.classList.contains('card__like-button_is-active')){
    dellLikeOnCard(cardData._id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    addLikeOnCard(cardData._id)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.add('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err)
    })
  }
};