// получение карточек с сервера

const getInitialCards = () => {

  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4'
    }
  })
  .then(res => res.json())
  .catch(error => console.log(error))

}

// отправка новой карточки на сервер

const updateInitialCards = (cardName, cardLink) => {

  return fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
    method: 'POST',  
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))

}

// удаление карточки с сервера

const deleteCards = (cardId) => {

  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/${cardId}`, {
    method: 'DELETE',  
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4',
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data => console.log(data))

}

// лпоставить лайк

const likeCard = (cardId) => {

  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
    method: 'PUT',  
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4',
      'Content-Type': 'application/json'
    },
  })

}

// убрать лайк

const disLikeCard = (cardId) => {

  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
    method: 'DELETE',  
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4',
      'Content-Type': 'application/json'
    },
  })

}

// получение профиля с сервера

const getProfileInfo = (profileName, profileInfo, profileAvatar) => {

  return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4'
    }
  })
  .then(res => res.json())
  .then((data) => {
    profileName.textContent = data.name;
    profileInfo.textContent = data.about;
    profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен');
  })

}

// отправка данных профиля на сервер

const updateProfileInfo = (profileName, profileInfo) => {
  
  return fetch('https://nomoreparties.co/v1/wff-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileInfo
    })
  })
  .catch(error => console.log(error))

}

// обновление аватара

const changeAvatar = (url) => {

  return fetch(`https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar`, {
    method: 'PATCH',  
    headers: {
      authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })

}

// EXPORT => => =>

export {
  getInitialCards,
  updateInitialCards,
  deleteCards,
  likeCard,
  disLikeCard,
  getProfileInfo,
  updateProfileInfo,
  changeAvatar
};