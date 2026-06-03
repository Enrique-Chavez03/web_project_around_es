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
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editPopup);
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
    // Parametros para los datos incompletos
    const { name = "Titulo", link = "https://via.placeholder.com/300x200?text=Imagen+no+disponible" 
    } = cardData;

    // Obtener Template
    const cardTemplate = document.querySelector(`#card-template`);
    const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

    const cardImage = cardElement.querySelector(`.card__image`);
    const cardTitle = cardElement.querySelector(`.card__title`);
    const likeButton = cardElement.querySelector(`.card__like-button`);
    const deleteButton = cardElement.querySelector(`.card__delete-button`);


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
    const cardData = {name, link};
    const cardElement = getCardElement(cardData);
    container.prepend(cardElement);
}

// Render de todas las tarjetas iniciales
function renderCards() {
    initialCards.forEach(cardData => {
        renderCard(cardData.name, cardData.link, cardsList);
    });
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const placeName = document.querySelector(`.popup__input_type_card-name`).value;
    const linkUrl = document.querySelector(`.popup__input_type_url`).value;

    if(placeName && linkUrl) {
        renderCard(placeName, linkUrl, cardsList);
        evt.target.reset();
        closeModal(newCardPopup);
    }
}

// ========== EVENT LISTENERS ==========

editButton.addEventListener('click', handleOpenEditModal);

editCloseButton.addEventListener('click', () => {
    closeModal(editPopup);
});

addButton.addEventListener('click', () => {
    const newCardForm = document.querySelector(`#new-card-form`);
    newCardForm.reset();
    openModal(newCardPopup);
});

newCardCloseButton.addEventListener('click', () => {
    closeModal(newCardPopup);
});

imageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});

formEdit.addEventListener('submit', handleProfileFormSubmit);


const newCardForm = document.querySelector('#new-card-form');
newCardForm.addEventListener('submit', handleCardFormSubmit);


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

// Me costo muchos dias hacer este JS pero con un poco de ayuda de herramientas hoy en dia se puede hacer.
// No se si puedan ayudarme con comentarios para poder mejorar aun más mi logica de programación??
// Libros, paguinas, herramientas, etc....??