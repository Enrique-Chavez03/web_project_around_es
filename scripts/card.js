export default class Card {
    constructor({ name, link}, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();
        this.cardImage = this._element.querySelector(`card_image`);
        this.cardTitle = this._element.querySelector(`.card_title`);
        this.likeButton = this._element.querySelector(`.card_like-button`);
        this.deleteButton = this._element.querySelector(`.card_delete-button`);
        this._setEventListeners();
    }

    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        return template.content.querySelector(`.card`).cloneNode(true);
    }

    _handleLikeClick() {
        this.likeButton.classList.toggle(`card_like-button_is-active`);
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    _handleImageClick() {
        this.handleCardClick(this._link, this._name);
    }

    _setEventListeners() {
        this._likeButton.addEventListener(`click`, () => this._handleLikeClick());
        this._deleteButton.addEventListener(`click`, () => this._handleDeleteClick());
        this._cardImage.addEventListener(`click`, () => this._handleImageClick());
    }

    getCardElement() {
        return this._element;
    }
}