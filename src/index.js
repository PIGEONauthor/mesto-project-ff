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
  apiConfig,
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
const editFormSubmitButton = profileEditForm.querySelector('.popup__button');
const profileAvatar = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileTitle = document.querySelector('.profile__description');

const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const avatarEditButton = document.querySelector('.profile__image-edit');
const avatarEditForm = document.forms['edit-avatar'];
const avatarFormInput = avatarEditForm.elements.url;
const avatarFormSubmitButton = avatarEditForm.querySelector('.popup__button');

const cardAddPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardDeletePopup = document.querySelector('.popup_type_delete-card');
const cardForm = document.forms['new-place'];
const cardFormNameInput = cardForm.elements['place-name'];
const cardFormLinkInput = cardForm.elements.link;
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardDeleteForm = document.forms['delete-card'];
const cardDeleteFormButton = cardDeleteForm.querySelector('.popup__button');
//const cardDeleteFormInput = cardDeleteForm.elements['id'];

const cardPopup = document.querySelector('.popup_type_image');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');

const closeButtonsList = document.querySelectorAll('.popup__close');

const cardsPlace = document.querySelector('.places__list');

// КОНФИГ ВАЛИДАЦИИ
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// ДОБАВЛЕНИЕ КАРТОЧКИ В КОНТЕЙНЕР
function renderCard(data, conteiner){

  conteiner.append(createCard(data, handleOpenDeletePopup, handleOpenImage, handleLikeCard));

}

// ВЫВОД ДАННЫХ НА СТРАНИЦУ
Promise.all(promises)
.then(() => {

  getInitialCards()
  .then(data => {
    // Вывод карточек с сервера на страницу
    data.forEach( (el) => {renderCard(el, cardsPlace)} )
  });
  // вывод данных профиля с сервера на страницу
  getProfileInfo()
  .then((data) => {
    profileName.textContent = data.name;
    profileTitle.textContent = data.about;
    profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

})

// ОТКРЫТИЕ МОДАЛЬНЫХ ОКОН
avatarEditButton.addEventListener('click', () => {
  
  avatarEditForm.reset();
  
  //очистка ошибок валидации
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
  //присвоим модальному окну id удаляемой карточки
  cardDeleteFormButton.dataset.id = id;

  openModal(cardDeletePopup);
  
}

// ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН ПО КНОПКЕ "X"
function heandleCloseByX(evt){

  const targerPopup = evt.target.closest('.popup');
  
  closeModal(targerPopup);
  
}

closeButtonsList.forEach((el) => {

  el.addEventListener('click', heandleCloseByX);

});

// ОБНОВЛЕНИЕ ПРОФИЛЯ
function handleProfileFormSubmit(evt){

  evt.preventDefault();

  editFormSubmitButton.textContent = 'Сохранение...';
  // отправка данных на сервер
  updateProfileInfo(editFormNameInput.value, editFormjobInput.value)
  .then((data) => {
    profileName.textContent = data.name;
    profileTitle.textContent = data.about;
    closeModal(profileEditPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    editFormSubmitButton.textContent = 'Сохранить';
  });

  //closeModal(profileEditPopup);

}

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// ОБНОВЛЕНИЕ АВАТАРА
function handleAvatarChanging(evt) {

  evt.preventDefault()

  avatarFormSubmitButton.textContent = 'Сохранение...';

  changeAvatar(avatarFormInput.value)
  .then((data) => {
    profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
    closeModal(avatarEditPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    avatarFormSubmitButton.textContent = 'Сохранить';
  });

}

avatarEditForm.addEventListener('submit', handleAvatarChanging);

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function handleAddCard(evt){
  
  evt.preventDefault();

  cardFormSubmitButton.textContent = 'Сохранение...';
  
  const newCardData = {
    name: cardFormNameInput.value,
    link: cardFormLinkInput.value,
  };

  updateInitialCards(newCardData.name, newCardData.link)
  .then((data) => {
    cardsPlace.prepend(createCard(data, handleOpenDeletePopup, handleOpenImage, handleLikeCard));
    //renderCard(data, cardsPlace);
    closeModal(cardAddPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    cardFormSubmitButton.textContent = 'Сохранить';
  });

}

cardForm.addEventListener('submit', handleAddCard);

// УДАЛЕНИЕ КАРТОЧКИ
function handleremoveCard(evt){

  evt.preventDefault();
  // получаем id удаляемой карточки из id формы
  const cardDeleteId = cardDeleteFormButton.dataset.id;

  deleteCards(cardDeleteId)
  .then(() => {
    const deleteTarget = document.querySelector(`[id='${cardDeleteId}']`);
    deleteTarget.remove();
    closeModal(cardDeletePopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

}

cardDeleteForm.addEventListener('submit', handleremoveCard);

// АКТИВАЦИЯ ВАЛИДАЦИИ
enableValidation(validationConfig);


fetch('https://nomoreparties.co/v1/wff-cohort-1/cards', {
  headers: {
    authorization: '278bb077-1673-45bd-9597-3e9d7ec352d4'
  }
})
.then(res => res.json())
.then(data => console.log(data))

