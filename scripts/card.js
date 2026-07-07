export default class Card {
    constructor({ name, link}, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;

        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(`.card__image`);
        this._cardTitle = this._element.querySelector(`.card__title`);
        this._likeButton = this._element.querySelector(`.card__like-button`);
        this._deleteButton = this._element.querySelector(`.card__delete-button`);

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

    }

    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        if (!template) {
            throw new Error(`Template "${this._templateSelector}" no encontrado`);
        }
        return template.content.querySelector('.card').cloneNode(true);
    }

    setEventListeners() {
        if (this._likeButton) {
            this._likeButton.addEventListener('click', () => this._handleLikeClick());
        }
        if (this._deleteButton) {
            this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
        }
        if (this._cardImage) {
            this._cardImage.addEventListener('click', () => this._handleImageClick());
        }
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('card__like-button_is-active');
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    _handleImageClick() {
        this._handleCardClick(this._link, this._name);
    }

    getCardElement() {
        return this._element;
    }
}