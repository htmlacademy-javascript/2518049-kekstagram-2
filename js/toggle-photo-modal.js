import { isEscapeKey } from './utils';

const pageBody = document.querySelector('body');

const photoModal = document.querySelector('.big-picture');
const photoModalCloseButton = photoModal.querySelector('.big-picture__cancel');

const commentsCountBlock = photoModal.querySelector('.social__comment-count');
const commentsLoader = photoModal.querySelector('.comments-loader');

const openPhotoModal = () => {
  photoModal.classList.remove('hidden');
  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      photoModal.classList.add('hidden');
      pageBody.classList.remove('modal-open');
    }
  });
};

const closePhotoModal = () => {
  photoModal.classList.add('hidden');
  commentsCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      photoModal.classList.add('hidden');
      pageBody.classList.remove('modal-open');
    }
  });
};

photoModalCloseButton.addEventListener('click', () => {
  closePhotoModal();
});

export {openPhotoModal};

