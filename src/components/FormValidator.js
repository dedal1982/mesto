class FormValidator {
  constructor(validatorConfig, formElement) {
    this.validatorConfig = validatorConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this.validatorConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this.validatorConfig.submitButtonSelector);
  }
  _showInputError = ( inputElement, errorMessage) => {
    const elementError = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.validatorConfig.inputErrorClass);
    elementError.textContent = errorMessage;
    elementError.classList.add(this.validatorConfig.errorClass);
  };
  _hideInputError = (inputElement) => {
    const elementError = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.validatorConfig.inputErrorClass);
    elementError.classList.remove(this.validatorConfig.errorClass);
    elementError.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonStatus();

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonStatus();
      }, 0);
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonStatus();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonStatus() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this.validatorConfig.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "true");
    } else {
      this._buttonElement.classList.remove(this.validatorConfig.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  resetValidation() {
    this._toggleButtonStatus();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export default FormValidator;
