import { isEscapeKey } from './utils';

const pageBody = document.querySelector('body');

const photoEditorModal = document.querySelector('.img-upload__overlay');
const photoEditorModalCloseButton = photoEditorModal.querySelector('.img-upload__cancel');
const photoUploadElement = document.querySelector('.img-upload__input');
const photoEffectLevelElement = photoEditorModal.querySelector('.effect-level__value');
const photoHashtagsElement = photoEditorModal.querySelector('.text__hashtags');
const photoDescriptionElement = photoEditorModal.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if(document.activeElement === photoHashtagsElement || document.activeElement === photoDescriptionElement) {
    evt.stopPropagation();
  } else if(isEscapeKey(evt)) {
    evt.preventDefault();
    photoEditorModal.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    photoUploadElement.value = '';
    photoEffectLevelElement.value = '';
    photoHashtagsElement.value = '';
    photoDescriptionElement.value = '';
  }
};

const openFormModal = () => {
  photoEditorModal.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeFormModal = () => {
  photoEditorModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  photoUploadElement.value = '';
  photoEffectLevelElement.value = '';
  photoHashtagsElement.value = '';
  photoDescriptionElement.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

photoUploadElement.addEventListener('change', () => {
  openFormModal();
});

photoEditorModalCloseButton.addEventListener('click', () => {
  closeFormModal();
});

export {openFormModal};

