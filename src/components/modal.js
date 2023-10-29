// экспорт

export {openModal, closeModal, handleCloseByEcs, handleCloseByOverlay};

/*
  *********ОПИСАНИЕ МОДУЛЯ*********

  Модуль предоставляет возможность плавного открытия
и закрытия модальных окон, а также возможность добавить
закрытие модальных окон по нажатию на overlay или Escape.

  *********ИНСТРУКЦИЯ К МОДУЛЮ*********

  Модальное окно должно быть скрыто через "display: none"

  В таблицу стилей необходимо добавить два селектора класса:

1) .popup_is-animated {
      display: flex;
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      user-select: none;
      transition: visibility 0s 0.6s, opacity 0.6s;
    }
2) .popup_is-opened {
      display: flex;
      visibility: visible;
      opacity: 1;
      pointer-events: all;
      transition: visibility 0s, opacity 0.6s;
    }

  Модуль содержит следующие функции:
-- openModal() - функция открытия модального окна;
-- closeModal() - функция закрытия модального окна;
-- handleCloseByEcs() - закрытие окна по кнопке "Escape";
-- handleCloseByOverlay() - закрытие окна по оверлею;

  Функции openModal() и closeModal() принимают на вход
"ссылку на модальное окно".
  При необходимости добавить для окна тот или иной функционал
закрытия - необоходимо, при вызове функций открытия окна,
передать в качестве дополнительного аргумента нужную callback-функцию.

  При добавлении своего функционала закрытия окна(напр. по кнопке в UI):
в функцию closeModal() необходимо передать те callback-функции,
которые были указаны при открытии этого окна.
*/

// открытие модального окна

function openModal(popup, ...handlers){

  popup.classList.add('popup_is-animated');
    
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
  }, 0);
  
  if (handlers.includes(handleCloseByEcs)){
    document.addEventListener('keydown', handleCloseByEcs);
  }

  if (handlers.includes(handleCloseByOverlay)){
    document.addEventListener('click', handleCloseByOverlay);
  }

}

// закрытие модального окна

function closeModal(popup, ...handlers){

  popup.classList.add('popup_is-animated');

  setTimeout(() => {
    popup.classList.remove('popup_is-opened');
  }, 0);

  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
    
  if (handlers.includes(handleCloseByEcs)){
    document.removeEventListener('keydown', handleCloseByEcs);
  }

  if (handlers.includes(handleCloseByOverlay)){
    document.removeEventListener('click', handleCloseByOverlay);
  }
  
}

// закрытие по кнопке Escape

function handleCloseByEcs(evt){

  const targerPopup = document.querySelector('.popup_is-opened');
  
  if (evt.key === 'Escape'){
    closeModal(targerPopup, handleCloseByOverlay, handleCloseByEcs);
  }
  
}

// закрытие по клику на Overlay

function handleCloseByOverlay(evt){
  
  const targerPopup = document.querySelector('.popup_is-opened');
  const eveventTarget = evt.target.classList.value;
  
  if (eveventTarget.includes('popup_is-opened')){
    closeModal(targerPopup, handleCloseByOverlay, handleCloseByEcs);
  }

}