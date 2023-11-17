// валидация формы "Редактировать профиль"

const emptyInputMessage = 'Вы пропустили это поле.';
const onInputErrorMessage = `Разрешены только латинские, 
кириллические буквы, знаки дефиса и пробелы`;
// inputElement.dataset.errorMessage --- получение ошибки из дата*-атрибута

// const formError = formElement.querySelector(`.${formInput.id}-error`);


function showInputError(form, formInput) {

  const inputError = form.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('popup__input_type_error');
  inputError.classList.add('popup__error_visible');

}

function hideInputError(form, formInput) {

  const inputError = form.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove('popup__input_type_error');
  inputError.classList.remove('popup__error_visible');

}

function isValid(form, formInput) {

  if (!formInput.validity.valid) {
    showInputError(form, formInput);
  }else {
    hideInputError(form, formInput);
  }

}

function setEventListeners(form, inputSelector) {

  const inputList = Array.from( form.querySelectorAll(`${inputSelector}`) );

  inputList.forEach(input => {

    input.addEventListener('ínput', () => {
      isValid(form, input);
    })

  });

}

function enableValidation(data) {

  const formList = Array.from( document.querySelectorAll(`${data.formSelector}`) );

  formList.forEach(form => {
    setEventListeners(form, data.inputSelector);
  })

}

/*

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

*/

// EXPORT => => =>

export {enableValidation};