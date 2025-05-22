// @todo: Темплейт карточки
//Раздел куда мы поместим нашу созданную карточку
const cards = document.querySelector('.places__list');
const cardTamplate = document.querySelector('#card-template').content;

//Функция создания карточки (должна принимать в себя 3 аргумента по ТЗ)
function createCard (imgLink, title, dellCard) {
  //Клонируем элемент листа, который нужно будет наполнить
  const card = cardTamplate.querySelector('.places__item').cloneNode(true);
  //Находим все разделы и записываем их в переменные
  const cardImage = card.querySelector('.card__image');
  const cardDellButton = card.querySelector('.card__delete-button');
  const cartTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like-button');
  //Картинка имеет ссылку и описание, необхоимо присвоить им эти значения
  cardImage.src = imgLink;
  cardImage.alt = title;
  cartTitle.textContent = title;

  cardDellButton.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    dellCard(eventTarget);
  })

  return card;
}

function addCard (card) {
  cards.append(card)
}

function dellCard (cardDellButton) {
  const removeCard = cardDellButton.closest('.places__item');
  removeCard.remove();
}

initialCards.forEach((item) => {
  const finalCard = createCard(item.link, item.name, dellCard);
  addCard(finalCard);
})

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу