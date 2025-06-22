//по заданию тут функции создания карточки, лайка и удаления
//Функция создания
export const createCard = (cardLink, cardName, dellCard, likeFunc, displayImagePopup) => {
  const cardTamplate = document.querySelector('#card-template').content;
  //Клонируем элемент листа, который нужно будет наполнить
  const cardElement = cardTamplate.querySelector('.places__item').cloneNode(true);
  //Находим все разделы и записываем их в переменные
  const cardImage = cardElement.querySelector('.card__image');
  const dellButton = cardElement.querySelector('.card__delete-button');
  const cartTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  //Картинка имеет ссылку и описание, необхоимо присвоить им эти значения
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cartTitle.textContent = cardName;

  dellButton.addEventListener('click', () => dellCard(cardElement));
  likeButton.addEventListener('click', () => likeFunc(likeButton));
  cardImage.addEventListener('click', () => displayImagePopup(cardLink, cardName));

  return cardElement;
}

//Удаления всей карточки
export const dellCard = (cardElement) => {
  cardElement.remove()
}

//Лайк
export const likeFunc = (evt) => {
  evt.classList.toggle('card__like-button_is-active')
}

