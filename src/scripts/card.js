//по заданию тут функции создания карточки, лайка и удаления
//Функция создания
export const createCard = (imgLink, title, dellCard, likeFunc, imagePopup) => {
  const cardTamplate = document.querySelector('#card-template').content;
  //Клонируем элемент листа, который нужно будет наполнить
  const cardElement = cardTamplate.querySelector('.places__item').cloneNode(true);
  //Находим все разделы и записываем их в переменные
  const cardImage = cardElement.querySelector('.card__image');
  const dellButton = cardElement.querySelector('.card__delete-button');
  const cartTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  //Картинка имеет ссылку и описание, необхоимо присвоить им эти значения
  cardImage.src = imgLink;
  cardImage.alt = title;
  cartTitle.textContent = title;

  dellButton.addEventListener('click', () => dellCard(cardElement));
  likeButton.addEventListener('click', () => likeFunc(likeButton));
  cardImage.addEventListener('click', (evt) => imagePopup(evt, title));


  return cardElement;
}

//Удаления всей карточки
export const dellCard = (cardElement) => {
  const cardItem = cardElement.closest('.places__item');
  cardItem.remove()
}

//Лайк
export const likeFunc = (evt) => {
  if (evt.classList.contains('card__like-button')) {
    evt.classList.toggle('card__like-button_is-active')
  }
}

