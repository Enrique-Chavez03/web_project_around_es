const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },

    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },

    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },

    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },

    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },

    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

// Botones
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Modales (popups)
const editPopup = document.querySelector('#edit-popup');
const newCardPopup = document.querySelector('#new-card-popup');
const imagePopup = document.querySelector('#image-popup');


const editCloseButton = editPopup.querySelector('.popup__close');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');


const formEdit = document.querySelector('#edit-profile-form');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

// Elementos del perfil
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const cardsList = document.querySelector('.cards__list');

cardsList.innerHTML = ";//Limpiar tarjetas hardcoded"


// =========== VALIDACIÓN ==========
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(#${inputElement.id}-error);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(#${inputElement.id}-error);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
    f (!inputElement.validity.valid) {
        if (inputElement.validity.valueMissing) {
            showInputError(formElement, inputElement, 'Por favor, rellena este campo.');
        } else if (inputElement.validity.tooShort) {
            showInputError(formElement, inputElement, Debe tener al menos ${inputElement.minLength} caracteres.);
        } else if (inputElement.validity.tooLong) {
            showInputError(formElement, inputElement, Debe tener como máximo ${inputElement.maxLength} caracteres.);
        } else if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
            showInputError(formElement, inputElement, 'Por favor, introduce una URL válida.');
        }
        return false;
    } else {
        hideInputError(formElement, inputElement);
        return true;
    }
}

function toggleButtonState(formElement, buttonElement) {
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const isFormValid = inputs.every(input => input.validity.valid);
    if (isFormValid) {
        buttonElement.classList.remove('popup__button_inactive');
        buttonElement.disabled = false;
        } else {
        buttonElement.classList.add('popup__button_inactive');
        buttonElement.disabled = true;
    }
}

function enableValidation(formElement) {
    const buttonElement = formElement.querySelector('.popup__button');
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    toggleButtonState(formElement, buttonElement);
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(formElement, buttonElement);
        });
    });
}

function resetValidation(formElement) {
    const inputs = Array.from(formElement.querySelectorAll(`.popup__input`));
    const buttonElement = formElement.querySelector(`.popup__button`);
    inputs.forEach(input => hidelmputError(formElement, input));
    toggleButtonState(formElement, buttonElement);
}


// Abrir modal
function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener(`keydown`, handleEscKey);
}

// Cerrar modal
function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener(`keydown`, handleEscKey);
}

function handleOverlayClick(event, modalElement) {
    if(event.target === modalElement) closeModal(modalElement);
}

function handleEscKey(event) {
    if (event.key === `Escape`) {
        const openPopup = document.querySelector(`.popup_is-opened`);
        if(openPopup) closeModal(openPopup);
    }
}

function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
    fillProfileForm();
    resetValidation(formEdit);
    openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    if (formEdit.checkValidity()) { 
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
        closeModal(editPopup);
    }
}

// Apariencia del boton Like
function handleLikeButton(likeButton) {
    likeButton.classList.toggle(`card__like-button_is-active`);
}

//Hanlder de eliminacion de tarjeta del DOM
function handleDeleteCard(cardElement) {
    cardElement.remove();
}

//Apertura de modal en imagen
function handleImageClick(link, name) {
    const popupImage = imagePopup.querySelector(`.popup__image`);
    const popupCaption = imagePopup.querySelector(`.popup__caption`);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
}

function getCardElement(cardData) {
    const { name = "Titulo", link = "https://via.placeholder.com/300x200?text=Imagen+no+disponible" 
    } = cardData;
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    likeButton.addEventListener(`click`, () => handleLikeButton(likeButton));
    deleteButton.addEventListener(`click`, () => 
        handleDeleteCard(cardElement));
    cardImage.addEventListener(`click`, () => 
        handleImageClick(link, name));
    

    return cardElement;
}

// Funcion para renderizar una tarjeta
function renderCard(name, link, container) {
    const cardElement = getCardElement ({name, link});
    container.prepend(cardElement);
}


function renderCards() {
    initialCards.forEach(card => renderCard(cardData.name, card.link, cardsList));
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const placeName = document.querySelector(`#card-name`);
    const linkUrl = document.querySelector(`#card-url`);
    if(newCardForm.checkValidity()) {
        renderCard(placeName.value, linkUrl.value, cardsList);
        evt.target.reset();
        resetValidation(newCardForm);
        closeModal(newCardPopup);
    }
}

// ========== EVENT LISTENERS ==========

editButton.addEventListener('click', handleOpenEditModal);

editCloseButton.addEventListener('click', () => {
    closeModal(editPopup);
});

addButton.addEventListener('click', () => {
    newCardForm.reset();
    resetValidation(newCardForm);
    openModal(newCardPopup);
});

newCardCloseButton.addEventListener('click', () => {
    closeModal(newCardPopup);
});

imageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});

imageCloseButton.addEventListener(`click`, () => closeModal(imagePopup));

editPopup.addEventListener(`click`, (e) => handleOverlayClick(e, editPopup));
newCardPopup.addEventListener(`click`, (e) => handleOverlayClick(e, newCardPopup));
imagePopup.addEventListener(`click`, (e) => handleOverlayClick(e, imagePopup));

enableValidation(formEdit);
const newCardForm = document.querySelector(`new-card-form`);
enableValidation(newCardForm);
newCardForm.addEventListener(`submit`, handleCardFormSubmit);

renderCards();
