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


// Abrir modal
function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
}

// Cerrar modal
function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
}

function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
    fillProfileForm();
    openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    
    // Actualizar el perfil con los valores del formulario
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    
    // Cerrar el modal después de guardar
    closeModal(editPopup);
}

// Crear una tarjeta
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    // Evento like
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });
    
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
    
    cardImage.addEventListener('click', () => {
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openModal(imagePopup);
    });
    
    return cardElement;
}


function renderCards() {
    initialCards.forEach(cardData => {
        const card = createCard(cardData);
        cardsList.appendChild(card);
    });
}

// ========== EVENT LISTENERS ==========

editButton.addEventListener('click', handleOpenEditModal);

// Cerrar modal editar perfil
editCloseButton.addEventListener('click', () => {
    closeModal(editPopup);
});

// Abrir modal nueva tarjeta
addButton.addEventListener('click', () => {
    newCardForm.reset();
    openModal(newCardPopup);
});

// Cerrar modal nueva tarjeta
newCardCloseButton.addEventListener('click', () => {
    closeModal(newCardPopup);
});

// Cerrar modal imagen
imageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});

// ========== MANEJO DE FORMULARIOS ==========
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Formulario nueva tarjeta
const newCardForm = document.querySelector('#new-card-form');
newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const placeName = document.querySelector('.popup__input_type_card-name').value;
    const linkUrl = document.querySelector('.popup__input_type_url').value;
    
    const newCardData = {
        name: placeName,
        link: linkUrl
    };
    
    const newCard = createCard(newCardData);
    cardsList.prepend(newCard);
    
    newCardForm.reset();
    closeModal(newCardPopup);
});

const popups = [editPopup, newCardPopup, imagePopup];
popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
});

// ========== CERRAR MODAL CON TECLA ESC ==========
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup);
        }
    }
});

renderCards();