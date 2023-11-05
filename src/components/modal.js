// экспорт

export {openModal, closeModal};

/*
  *********ОПИСАНИЕ МОДУЛЯ*********

  Модуль предоставляет возможность плавного открытия
и закрытия модальных окон, а также возможности
закрытия модальных окон по нажатию на overlay или Escape.

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

*/

// открытие модального окна

function openModal(popup){

  popup.classList.add('popup_is-animated');
    
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
  }, 0);
  
  document.addEventListener('keydown', handleCloseByEcs);
  document.addEventListener('mousedown', handleCloseByOverlay);

}

// закрытие модального окна

function closeModal(popup){

  popup.classList.add('popup_is-animated');

  setTimeout(() => {
    popup.classList.remove('popup_is-opened');
  }, 0);

  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
    
  document.removeEventListener('keydown', handleCloseByEcs);
  document.removeEventListener('mousedown', handleCloseByOverlay);
  
}

// закрытие по кнопке Escape

function handleCloseByEcs(evt){
  
  if (evt.key === 'Escape'){
    const targerPopup = document.querySelector('.popup_is-opened');
    closeModal(targerPopup);
  }
  
}

// закрытие по клику на Overlay

function handleCloseByOverlay(evt){
    
  if (evt.target.classList.contains('popup_is-opened')){
    //const targerPopup = document.querySelector('.popup_is-opened');
    closeModal(evt.target);
  }

}