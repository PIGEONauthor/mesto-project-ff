// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsPlace = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(imageLink, imageAlt, delFunc){
  
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardDelButton = card.querySelector('.card__delete-button');
  
  cardImage.src = imageLink;
  cardImage.alt = imageAlt;
  
  cardDelButton.addEventListener('click', delFunc);

  cardsPlace.append(card);

}

// @todo: Функция удаления карточки

function delCard(evt) {

  const delTarget = evt.target.closest('.card');
  delTarget.remove();
  
}

// @todo: Вывести карточки на страницу

initialCards.forEach( (el) => { addCard(el.link, el.name, delCard) })