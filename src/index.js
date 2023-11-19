// IMPORT <= <= <=

import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, handleDeleteCard, handleLikeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getInitialCards} from './components/api.js';

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

const closeButtonsList = document.querySelectorAll('.popup__close');

const cardsPlace = document.querySelector('.places__list');

//конфиг валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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

  clearValidation(profileEditForm ,validationConfig);

  openModal(profileEditPopup);

});

cardAddButton.addEventListener('click', () => {
  
  cardForm.reset();

  clearValidation(cardForm ,validationConfig);

  openModal(cardAddPopup);
  
});

function handleOpenImage(evt){

  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = cardPopupCaption.textContent = evt.target.alt;

  openModal(cardPopup);

}

// закрытие POPUP-ов по кнопке "X"

function heandleCloseByX(evt){

  const targerPopup = evt.target.closest('.popup');
  
  closeModal(targerPopup);
  
}

closeButtonsList.forEach((el) => {

  el.addEventListener('click', heandleCloseByX);

});

// обновление профиля

function handleProfileFormSubmit(evt){

  evt.preventDefault();

  profileName.textContent = editFormNameInput.value;
  profileTitle.textContent = editFormjobInput.value;

  closeModal(profileEditPopup);

}

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// добавление новой карточки

function handleAddCard(evt){
  
  evt.preventDefault();
  
  const newCardData = {
    name: cardFormNameInput.value,
    link: cardFormLinkInput.value,
  };

  renderCard(newCardData, cardsPlace);

  closeModal(cardAddPopup);

}

cardForm.addEventListener('submit', handleAddCard);


// активация ВАЛИДАЦИИ

enableValidation(validationConfig);

// API

getInitialCards();