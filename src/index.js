// импорт

import './pages/index.css';
import {initialCards, createCard, handleDeleteCard, handleLikeCard} from './components/cards.js';
import {openModal, closeModal, handleCloseByEcs, handleCloseByOverlay} from './components/modal.js';

// DOM узлы

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms['edit-profile'];
const editFormNameInput = profileEditForm.elements.name;
const editFormjobInput = profileEditForm.elements.description;
const profileName = document.querySelector('.profile__title');
const profileTitle = document.querySelector('.profile__description');

const cardAddPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardForm = document.forms['new-place'];
const cardFormNameInput = cardForm.elements['place-name'];
const cardFormLinkInput = cardForm.elements.link;

const cardPopup = document.querySelector('.popup_type_image');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');

const CloseButtonsList = document.querySelectorAll('.popup__close');

const cardsPlace = document.querySelector('.places__list');

// добавление карточки в контейнер

function renderCard(data, conteiner){

  conteiner.prepend(createCard(data, handleDeleteCard, handleOpenImage, handleLikeCard));

}

// Вывод карточек на страницу

initialCards.forEach( (el) => {renderCard(el, cardsPlace)} );


// открытие POPUP-ов

profileEditButton.addEventListener('click', () => {

  editFormNameInput.value = profileName.textContent;
  editFormjobInput.value = profileTitle.textContent;

  openModal(profileEditPopup, handleCloseByEcs, handleCloseByOverlay);

});

cardAddButton.addEventListener('click', () => {
  
  cardForm.reset();

  openModal(cardAddPopup, handleCloseByEcs, handleCloseByOverlay);
  
});

function handleOpenImage(evt){

  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = cardPopupCaption.textContent = evt.target.alt;

  openModal(cardPopup, handleCloseByEcs, handleCloseByOverlay);

}

// закрытие POPUP-ов по кнопке "X"

function heandleCloseByX(evt){

  const targerPopup = evt.target.closest('.popup');
  
  closeModal(targerPopup, handleCloseByEcs, handleCloseByOverlay);
  
}

CloseButtonsList.forEach((el) => {

  el.addEventListener('click', heandleCloseByX);

});

// обновление профиля

function handleFormSubmit(evt){

  evt.preventDefault();

  profileName.textContent = editFormNameInput.value;
  profileTitle.textContent = editFormjobInput.value;

  closeModal(evt.target.closest('.popup'));

}

profileEditForm.addEventListener('submit', handleFormSubmit);

// добавление новой карточки

function handleAddCard(evt){
  
  evt.preventDefault();
  
  const newCardData = {
    name: cardFormNameInput.value,
    link: cardFormLinkInput.value,
  };

  renderCard(newCardData, cardsPlace);

  closeModal(evt.target.closest('.popup'));

  cardForm.reset();

}

cardForm.addEventListener('submit', handleAddCard);