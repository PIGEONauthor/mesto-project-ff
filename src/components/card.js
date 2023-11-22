// IMPORT <= <= <=

import {likeCard, disLikeCard} from './api';

// Функция создания карточки

function createCard(cardData, popDelOpnFunc, PopOpnFunc, likeFunc){

  const cardTemplate = document.querySelector('#card-template').content;

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardId = cardData['_id'];
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-count');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;
  
  cardImage.addEventListener('click', PopOpnFunc);

  if (cardData.owner['_id'] != '0a4ac5110e6af2907d16b39b') {
    cardDeleteButton.style.display = 'none';
  }else {
    // cardDeleteButton.addEventListener('click', delFunc);
    cardDeleteButton.addEventListener('click', () => {
      popDelOpnFunc(cardId);
    });
  }
  
  cardLikeButton.addEventListener('click', () => {
    likeFunc(cardLikeButton, cardLikeCount, cardId);
  });
  
  return card;

}
  
// удаление карточки

// function handleDeleteCard(evt) {

//   const deleteTarget = evt.target.closest('.card');
//   deleteTarget.remove();
  
// }
  
// лайк на карточки
  
function handleLikeCard(likeButton, likeCountElement, cardId){

  if ( likeButton.classList.contains('card__like-button_is-active') ) {

    disLikeCard(cardId)
    .then(res => res.json())
    .then(data => {
      likeButton.classList.remove('card__like-button_is-active');
      likeCountElement.textContent = data.likes.length;
    })

  } else {

    likeCard(cardId)
    .then(res => res.json())
    .then(data => {
      likeButton.classList.add('card__like-button_is-active');
      likeCountElement.textContent = data.likes.length;
    })

  }

}

// EXPORT => => =>

export {createCard, /*handleDeleteCard,*/ handleLikeCard};