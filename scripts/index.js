import Card from './card.js';
import FormValidator from './FormValidator.js';
import { openModal, closeModal, handleOverlayClick } from './utils.js';


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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// DOM elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('#edit-popup');
const newCardPopup = document.querySelector('#new-card-popup');
const imagePopup = document.querySelector('#image-popup');
const editCloseButton = editPopup.querySelector('.popup__close');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const formEdit = document.querySelector('#edit-profile-form');
const formNewCard = document.querySelector('#new-card-form');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardsList = document.querySelector('.cards__list');

// Validators
const editValidator = new FormValidator(validationConfig, formEdit);
editValidator.setEventListeners();  

const newCardValidator = new FormValidator(validationConfig, formNewCard)
newCardValidator.setEventListeners();


// Profile functions
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  editValidator.resetValidation();
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

// Card functions
function handleCardClick(link, name) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(cardData, container) {
  const card = new Card(cardData, '#card-template', handleCardClick);
  const cardElement = card.getCardElement();
  container.prepend(cardElement);
  card.setEventListeners();
}

function renderCards() {
  initialCards.forEach(cardData => renderCard(cardData, cardsList));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  if (formNewCard.checkValidity()) {
    const placeName = document.querySelector('#card-name');
    const linkUrl = document.querySelector('#card-url');
    renderCard({ name: placeName.value, link: linkUrl.value }, cardsList);
    evt.target.reset();
    newCardValidator.resetValidation();
    closeModal(newCardPopup);
  }
}

// Event listeners
editButton.addEventListener('click', handleOpenEditModal);
formEdit.addEventListener('submit', handleProfileFormSubmit);
editCloseButton.addEventListener('click', () => closeModal(editPopup));
addButton.addEventListener('click', () => {
  formNewCard.reset();
  newCardValidator.resetValidation();
  openModal(newCardPopup);
});

newCardCloseButton.addEventListener('click', () => closeModal(newCardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));
editPopup.addEventListener('click', (e) => handleOverlayClick(e, editPopup));
newCardPopup.addEventListener('click', (e) => handleOverlayClick(e, newCardPopup));
imagePopup.addEventListener('click', (e) => handleOverlayClick(e, imagePopup));
formNewCard.addEventListener('submit', handleCardFormSubmit);

renderCards();