const config = {
  baseUrl:'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization:'d96a843e-7e4d-44f4-99b3-fb8472e4bfb2',
    'Content-Type':'application/json',
  },
};

const getResData = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(console.log(`Ошибка: ${res.status}`));
  }
};

export const getProfileFromServer = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(getResData);
};

export const editProfileOnServer = (profileName, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method:'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription
    })
  }).then(getResData)
};

export const getAllCardsFromServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(getResData)
};

export const addNewCardOnServer = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  }).then(getResData)
};

export const dellNewCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResData)
};

export const addLikeOnCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  }).then(getResData)
};

export const dellLikeOnCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then(getResData)
};

export const addNewAvatarOnServer = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarLink }),
  }).then(getResData)
};