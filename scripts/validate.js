const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const openInputError = (formElement, inputElement, errorMessage,{inputErrorClass, errorClass}) => {
  const elementError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  elementError.textContent = errorMessage;
  elementError.classList.add(errorClass);
};

const closeInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const elementError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  elementError.classList.remove(errorClass);
  elementError.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputError) => {
  if (!inputElement.validity.valid) {
    openInputError(formElement, inputElement, inputElement.validationMessage, inputError);
  } else {
    closeInputError(formElement, inputElement, inputError);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", true);
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
}

enableValidation(validationConfig);

