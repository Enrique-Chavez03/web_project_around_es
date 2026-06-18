function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form) => {
        const inputs = array.form(form.querySelector(config.inputSeletor));
        const submitButton = form.querySelector(config.submitButtonSelector);

function showInputError(inputElement, errorMessage) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideInputError(inputElement) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = ``;
}

function checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        let errorMessage = ``;
        if (inputElement.validity.valueMissing) {
            errorMessage = `Por favor, rellena este campo.`;
        } else if (inputElement.validity.tooShort) {
            errorMessage = `Debe tener al menos ${inputElement.minLength} caracteres.`;
        } else if (inputElement.validity.tooLong) {
            errorMessage = `Debe tener como máximo ${inputElement.maxLength} caracteres`;
        } else if (inputElement.validity.typeMismatch && inputElement.type === `url`) {
        errorMessage = `Por favor, introduce una URL válida.`;
        }
        showInputError(inputElement,errorMessage);
        return false;
        } else {
        hideInputError(inputElement);
        return true;
    }
}


function toggleButtonState() {
    const isFormValid = inputs.every((input) => input.validity.valid);
    if (isFormValid) {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.disabled = false;
    } else {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.disabled = true;
    }
}

    inputs.forEach((input) => {
    input.addEventListener(`input`, function() {
        checkInputValidity(this);
        toggleButtonState();
    });
});

toggleButtonState();

form.resetValidation = function() {
    inputs.forEach((input) => hidenInputError(input));
    toggleButtonState();
    };
 });
}

window.enableValidation = enableValidation;


// Agregue los archivos que efectivamente faltaban.
// Movi las funciones que tenia en el archivo index.js a este (validate.js)
// Pero siento que algo no me esta cuadrando, pero por aqui lo dejo para su revisión. 