// импорт

import './pages/index.css';
import {createCard} from './components/cards.js';
import {openModal, closeModal} from './components/modal.js';

// глобальные переменные

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

// DOM узлы

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms['edit-profile'];
const editFormNameInput = profileEditForm.elements.name;
const editFormjobInput = profileEditForm.elements.description;
const profileName = document.querySelector('.profile__title');
const profileTitle = document.querySelector('.profile__description');

const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');

const cardsPlace = document.querySelector('.places__list');

// Функция удаления карточки

function handleDeleteCard(evt) {

  const deleteTarget = evt.target.closest('.card');
  deleteTarget.remove();
  
}

// Функция добавления карточки в контейнер

function renderCard(data, conteiner){

  conteiner.append(createCard(data, handleDeleteCard, openModal));

}

// Вывод карточек на страницу

initialCards.forEach( (el) => {renderCard(el, cardsPlace)} );


// открытие popup-ов

profileEditButton.addEventListener('click', () => {

  openModal(profileEditPopup);
  editFormNameInput.value = profileName.textContent;
  editFormjobInput.value = profileTitle.textContent;

});

profileAddButton.addEventListener('click', () => {

  openModal(profileAddPopup);

});

// закрытие popup0-ов

window.addEventListener('click', (evt) => {
  
  if (evt.target.className.includes('popup ') || evt.target.className === 'popup__close') {
    
    closeModal(evt.target.closest('.popup'));

  }

})

function handleFormSubmit(evt){

  evt.preventDefault();

  profileName.textContent = editFormNameInput.value;
  profileTitle.textContent = editFormjobInput.value;
  
  closeModal(evt.target.closest('.popup'));

}

profileEditForm.addEventListener('submit', handleFormSubmit);