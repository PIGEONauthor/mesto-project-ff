// экспорт

export {initialCards, createCard, handleDeleteCard, handleLikeCard};

// массив карточек

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки

function createCard(cardData, delFunc, PopOpnFunc, likeFunc){
  
  const cardTemplate = document.querySelector('#card-template').content;

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardTitle.textContent = cardData.name;
  
  cardImage.addEventListener('click', PopOpnFunc);
  cardDeleteButton.addEventListener('click', delFunc);
  cardLikeButton.addEventListener('click', likeFunc);
  
  return card;

}

// удаление карточки

function handleDeleteCard(evt) {

  const deleteTarget = evt.target.closest('.card');
  deleteTarget.remove();
  
}

// лайк на карточки

function handleLikeCard(evt){

  if (evt.target.className.includes('card__like-button_is-active')){
    evt.target.classList.remove('card__like-button_is-active');
  }else {
    evt.target.className += ' card__like-button_is-active';
  }
  
}