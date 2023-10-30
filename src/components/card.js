// экспорт

export {createCard, handleDeleteCard, handleLikeCard};

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
    
    evt.target.classList.toggle('card__like-button_is-active');
  
  }