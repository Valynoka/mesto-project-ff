import { dellNewCardFromServer, addLikeOnCard, dellLikeOnCard } from "./api";
import {displayImagePopup } from '../index'

export const createCard = (cardName, cardLink, cardId, currentLikes) => {
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

  dellButton.addEventListener('click', () => dellCard(cardElement, cardId));
  likeButton.addEventListener('click', () => likeFunc(likeButton, likeCount, cardId));
  cardImage.addEventListener('click', () => displayImagePopup(cardName, cardLink));

  // if (ownerId !== userId) {
  //   dellButton.remove()
  // }

  // if (likeArr && likeArr.some(user => user._id === userId)) {
  //   likeButton.classList.contains('card__like-button_is-active')
  // }

  return cardElement;
}

//Удаления всей карточки
export const dellCard = (card, cardId) => {
  dellNewCardFromServer(cardId)
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
