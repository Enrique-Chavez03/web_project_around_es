export function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKey);
}

export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKey);
}

export function handleEscKey(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) closeModal(openPopup);
  }
}

export function handleOverlayClick(event, modalElement) {
  if (event.target === modalElement) closeModal(modalElement);
}
