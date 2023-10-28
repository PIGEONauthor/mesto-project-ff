// Функция создания карточки

export function createCard(cardData, delFunc, PopOpnFunc){
  
  const cardTemplate = document.querySelector('#card-template').content;

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardTitle = card.querySelector('.card__title');

  const cardPopup = document.querySelector('.popup_type_image');
  const cardPopupImage = cardPopup.querySelector('.popup__image');
  const cardPopupCaption = cardPopup.querySelector('.popup__caption');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardTitle.textContent = cardData.name;
  
  cardImage.addEventListener('click', () => {

    cardPopupImage.src = cardData.link;
    cardPopupImage.alt = cardPopupCaption.textContent = cardData.name;
    PopOpnFunc(cardPopup);

  });

  cardDeleteButton.addEventListener('click', delFunc);
  
  return card;

}

