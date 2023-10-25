// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsPlace = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardData, delFunc){
  
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardTitle.textContent = cardData.name;
  
  cardDeleteButton.addEventListener('click', delFunc);
  
  return card;

}

function renderCard(data, conteiner){
    conteiner.append(createCard(data, handleDeleteCard));
}

// @todo: Функция удаления карточки

function handleDeleteCard(evt) {

  const deleteTarget = evt.target.closest('.card');
  deleteTarget.remove();
  
}

// @todo: Вывести карточки на страницу

initialCards.forEach( (el) => {renderCard(el, cardsPlace)} )