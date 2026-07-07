export default class FormValidator {
    constructor(config, formElemen) {
        this._config = config;
        this._formElement = formElemen;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _checkInputValidity(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            inputElement.classList.add(this._config.inputErrorClass);
            errorElement.textContent = inputElement.validationMessage;
            errorElement.classList.add(this._config.errorClass);
        } else {
            inputElement.classList.remove(this._config.inputErrorClass);
            errorElement.textContent =``;
            errorElement.classList.remove(this._config.errorClass);
        }
    }

_toggleButtonState() {
    const isFormValid = this._inputList.every(input => input.validity.valid);
    if (isFormValid) {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    } else {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
    }
}

setEventListeners() {
    this._formElement.addEventListener(`submit`, (evt) => evt.preventDefault());
    this._inputList.forEach(input => {
        input.addEventListener(`input`, () => {
            this._checkInputValidity(input);
            this._toggleButtonState();
        });
    });
    this._toggleButtonState();
}

resetValidation() {
    this._inputList.forEach(input => {
        input.classList.remove(this._config.inputErrorClass);
        const errorElement = this._formElement.querySelector(`#${ input.id }-error`);
        if(errorElement) {
            errorElement.textContent = ``;
            errorElement.classList.remove(this._config.errorClass);
        }
    });
    this._toggleButtonState();
    }
}