// IMPORT <= <= <=

import './pages/index.css';
//import {initialCards} from './components/cards.js';
import {
  createCard,
  /*handleDeleteCard,*/
  handleLikeCard} from './components/card.js';
import {
  openModal,
  closeModal} from './components/modal.js';
import {
  enableValidation,
  clearValidation} from './components/validation.js';
import {
  getInitialCards,
  updateInitialCards,
  deleteCards,
  likeCard,
  disLikeCard,
  getProfileInfo,
  updateProfileInfo,
  changeAvatar} from './components/api.js';

const promises = [getInitialCards, getProfileInfo];

// DOM узлы

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms['edit-profile'];
const editFormNameInput = profileEditForm.elements.name;
const editFormjobInput = profileEditForm.elements.description;
const profileAvatar = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileTitle = document.querySelector('.profile__description');

const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const avatarEditButton = document.querySelector('.profile__image-edit');
const avatarEditForm = document.forms['edit-avatar'];
const avatarFormInput = avatarEditForm.elements.url;

const cardAddPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardDeletePopup = document.querySelector('.popup_type_delete-card');
const cardForm = document.forms['new-place'];
const cardFormNameInput = cardForm.elements['place-name'];
const cardFormLinkInput = cardForm.elements.link;
const cardDeleteForm = document.forms['delete-card'];
//const cardDeleteFormInput = cardDeleteForm.elements['id'];

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

  conteiner.prepend(createCard(data, handleOpenDeletePopup, handleOpenImage, handleLikeCard));

}

Promise.all(promises)
.then(() => {
  
  getInitialCards()
  .then(data => {
    // Вывод карточек с сервера на страницу
    data.forEach( (el) => {renderCard(el, cardsPlace)} )
  });
  // вывод данных профиля с сервера на страницу
  getProfileInfo(profileName, profileTitle, profileAvatar);

})

// открытие POPUP-ов

avatarEditButton.addEventListener('click', () => {
  
  avatarEditForm.reset();
  
  clearValidation(avatarEditForm ,validationConfig);
  
  openModal(avatarEditPopup);

})

profileEditButton.addEventListener('click', () => {

  editFormNameInput.value = profileName.textContent;
  editFormjobInput.value = profileTitle.textContent;

  clearValidation(profileEditForm ,validationConfig);

  openModal(profileEditPopup);

});

cardAddButton.addEventListener('click', () => {
  
  cardForm.reset();
  
  //очистка ошибок валидации
  clearValidation(cardForm ,validationConfig);

  openModal(cardAddPopup);
  
});

function handleOpenImage(evt){

  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = cardPopupCaption.textContent = evt.target.alt;

  openModal(cardPopup);

}

function handleOpenDeletePopup(id){

  cardDeleteForm.dataset.id = '';
  cardDeleteForm.dataset.id = id;

  openModal(cardDeletePopup);
  
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

  // отправка данных на сервер
  updateProfileInfo(profileName.textContent, profileTitle.textContent);

  closeModal(profileEditPopup);

}

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// обновление аватара

function handleAvatarChanging(evt) {

  evt.preventDefault()

  const newAvatarUrl = avatarFormInput.value;

  changeAvatar(newAvatarUrl)
  .then(() => {
    location.reload();
  })

}

avatarEditForm.addEventListener('submit', handleAvatarChanging);

// добавление новой карточки

function handleAddCard(evt){
  
  evt.preventDefault();
  
  const newCardData = {
    name: cardFormNameInput.value,
    link: cardFormLinkInput.value,
  };

  updateInitialCards(newCardData.name, newCardData.link)
  .then(() => {
    location.reload();
  })

  // renderCard(newCardData, cardsPlace);
  // closeModal(cardAddPopup);

}

cardForm.addEventListener('submit', handleAddCard);

// удаление карточки

function handleremoveCard(evt){
  
  evt.preventDefault();
  
  deleteCards(cardDeleteForm.dataset.id)
  .then(() => {
    location.reload();
  })
  
  // closeModal(cardDeletePopup);

}

cardDeleteForm.addEventListener('submit', handleremoveCard);

// активация ВАЛИДАЦИИ

enableValidation(validationConfig);


fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
  headers: {
    authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4'
  }
})
.then(res => res.json())
.then(data => console.log(data[0]))

