import { dellNewCardFromServer, addLikeOnCard, dellLikeOnCard } from "./api";
import {displayImagePopup } from '../index'

export const createCard = (cardName, cardLink, cardId, cardLikes, currentLikes, config, card, userId) => {
  const cardTamplate = document.querySelector('#card-template').content;
  //Клонируем элемент листа, который нужно будет наполнить
  const cardElement = cardTamplate.querySelector('.places__item').cloneNode(true);
  //Находим все разделы и записываем их в переменные
  const cardImage = cardElement.querySelector('.card__image');
  const dellButton = cardElement.querySelector('.card__delete-button');
  const cartTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__count-like');
  //Картинка имеет ссылку и описание, необхоимо присвоить им эти значения
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cartTitle.textContent = cardName;
  likeCount.textContent = currentLikes;

  dellButton.addEventListener('click', () => dellCard(cardElement, cardId, card, config, dellNewCardFromServer));
  likeButton.addEventListener('click', () => likeFunc(likeButton, likeCount, cardId));
  cardImage.addEventListener('click', () => displayImagePopup(cardName, cardLink));

  if (cardId !== userId) {
    dellButton.remove()
  }
  //Прошу прощения, за дерзость, но без комментариев от Вас я не разберусь
  //не могу получить лайки на карточки и почему то они не ставятся, хотя все вроде верно написал
  //не могу разобраться с тем, почему карточки перестали удаляться до этого все было хорошо, они добавлялись, 
  //определялись, как мои собственные и я их мог удалить. Сейчас, как нет - будто все не мои, даже те, которые я только что добавил. 
  
  // if (cardLikes.some(user => user._id === userId)) {
  //   likeButton.classList.toggle('card__like-button_is-active')
  // }

  return cardElement;
}

//Удаления всей карточки
export const dellCard = (card, cardId, config) => {
  dellNewCardFromServer(config, cardId)
    .then(() => {
      card.remove()
    })
    .catch((err) => {
      console.log(err)
    })
}

//Лайк
export const likeFunc = (likeButton, cardId, likeCount) => {
  if (likeButton.classList.contains('card__like-button_is-active')){
    dellLikeOnCard(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    addLikeOnCard(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err)
    })
  }
};
