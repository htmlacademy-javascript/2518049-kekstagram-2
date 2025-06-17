import { isEscapeKey } from './utils';
import { clearPreviousComments } from './create-photo-modal';

const pageBody = document.querySelector('body');

const photoModal = document.querySelector('.big-picture');
const photoModalCloseButton = photoModal.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    clearPreviousComments();
    photoModal.classList.add('hidden');
    pageBody.classList.remove('modal-open');
  }
};

const openPhotoModal = () => {
  photoModal.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhotoModal = () => {
  clearPreviousComments();
  photoModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

photoModalCloseButton.addEventListener('click', () => {
  closePhotoModal();
});

export {openPhotoModal};

