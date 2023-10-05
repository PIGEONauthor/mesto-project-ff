// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsPlace = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(imageLink, imageAlt){
  
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardItem.querySelector('.card__delete-button');
  
  cardItem.querySelector('.card__image').src = imageLink;
  cardItem.querySelector('.card__image').alt = imageAlt;
  
  delButton.addEventListener('click', delCard);

  cardsPlace.append(cardItem);

}

// @todo: Функция удаления карточки

function delCard(evt) {

  const delItem = evt.target.closest('.card');
  delItem.remove();
  
}

// @todo: Вывести карточки на страницу

//function cardsRelease(){}

initialCards.forEach( (el) => { addCard(el.link, el.name) })