function enableValidation(formElement, inputElement, config, errorMessage) {
    const errorElement = formElement.querySelectorAll(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}    

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = ``;
}

function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, config, inputElement.validationMessage);
    } else {
        hidenInputError(formElement, inputElement, config);
    }
}

function toggleButtonState(inputs, submitButton, config) {
    const isFormValid = inputs.every((input) => input.validity.valid);
    if (isFormValid) {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.disabled = false;
    } else {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.disabled = true;
    }
}

function setEventListeners(formElement, config) {
    const inputs = Array.form(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    
    toggleButtonState(inputs, submitButton, config);

    inputs.forEach((inputElement) => {
    inputElement.addEventListener(`input`, () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputs, submitButton, config);
    });
});

formElement.resetValidation = function() {
    inputs.forEach((input) => hideInputError(formElement, input, config));
    toggleButtonState(inputs, submitButton, config);
  };
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}

window.enableValidation = enableValidation;
