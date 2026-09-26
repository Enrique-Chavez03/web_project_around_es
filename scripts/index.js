import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// ---------- Instancias ----------

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-popup",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.name, job: data.description });
    editProfilePopup.close();
  },
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#new-card-popup",
  handleFormSubmit: (data) => {
    const newCardElement = createCard({
      name: data["place-name"],
      link: data.link,
    });
    cardSection.addItem(newCardElement);
    newCardPopup.close();
  },
});
newCardPopup.setEventListeners();

// ---------- Sección de tarjetas ----------

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// ---------- Helpers ----------

function createCard(data) {
  const card = new Card(data, "#card-template", (cardData) => {
    imagePopup.open(cardData);
  });
  return card.getCardElement();
}

// ---------- Validadores ----------

const editProfileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form")
);
editProfileValidator.setEventListeners();

const newCardValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form")
);
newCardValidator.setEventListeners();

// ---------- Listeners específicos ----------

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const { name, job } = userInfo.getUserInfo();
    document.querySelector(".popup__input_type_name").value = name;
    document.querySelector(".popup__input_type_description").value = job;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

// ---------- Render inicial ----------

cardSection.renderItems();