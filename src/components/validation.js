// валидация формы "Редактировать профиль"

const emptyInputMessage = 'Выпропустили это поле.';
const onInputErrorMessage = `Разрешены только латинские, 
кириллические буквы, знаки дефиса и пробелы`;

function showInputError(element) {
  element.classList.add('popup__input_type_error');
}

function hideInputError(element) {
  element.classList.remove('popup__input_type_error');
}

function isValid(formInput) {

  if (!formInput.validity.valid) {
    showInputError(formInput);
  }else {
    hideInputError(formInput);
   }

}

function enableValidation(data) {
  //
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

export {showInputError, hideInputError, isValid};