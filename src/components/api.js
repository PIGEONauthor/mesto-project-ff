const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
  headers: {
    authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4',
    'Content-Type': 'application/json'
  }
}

// получение карточек с сервера
const getInitialCards = () => {

  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
  .then(handleResponse)

}

// отправка новой карточки на сервер
const updateInitialCards = (cardName, cardLink) => {

  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',  
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(handleResponse)

}

// удаление карточки с сервера
const deleteCards = (cardId) => {

  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',  
    headers: apiConfig.headers,
  })
  .then(handleResponse)

}

// лпоставить лайк
const likeCard = (cardId) => {

  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',  
    headers: apiConfig.headers,
  })
  .then(handleResponse)

}

// убрать лайк
const disLikeCard = (cardId) => {

  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',  
    headers: apiConfig.headers,
  })
  .then(handleResponse)

}

// получение профиля с сервера
const getProfileInfo = () => {

  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  })
  .then(handleResponse)

}

// отправка данных профиля на сервер
const updateProfileInfo = (profileName, profileInfo) => {
  
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileInfo
    })
  })
  .then(handleResponse)

}

// обновление аватара
const changeAvatar = (url) => {

  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',  
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(handleResponse)

}

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// EXPORT => => =>
export {
  apiConfig,
  getInitialCards,
  updateInitialCards,
  deleteCards,
  likeCard,
  disLikeCard,
  getProfileInfo,
  updateProfileInfo,
  changeAvatar
};