import { closeFormModal, openFormModal } from './toggle-form-modal';
import { isEscapeKey } from './utils';

const pageBody = document.querySelector('body');

const photoUploadForm = document.querySelector('.img-upload__form');
const photoUploadElement = document.querySelector('.img-upload__input');
const photoEditorModal = document.querySelector('.img-upload__overlay');
const photoEditorModalCloseButton = photoEditorModal.querySelector('.img-upload__cancel');

const photoHashtags = photoUploadForm.querySelector('.text__hashtags');
const photoDescription = photoUploadForm.querySelector('.text__description');
const photoEffectLevelElement = photoEditorModal.querySelector('.effect-level__value');

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

let errorMessage;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateHashtags = (value) => {
  const hashtagTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
  const inputValue = value.toLowerCase().trim();
  const hashtagsArray = inputValue.split(/\s+/);
  const correctLength = hashtagsArray.length <= MAX_HASHTAG_COUNT;
  const containsOnlyHash = hashtagsArray.some((hashtag) => hashtag === '#');
  const isWhitespaceMissing = hashtagsArray.some((hashtag) => hashtag.slice(1).includes('#'));
  const isMatchingRegExp = hashtagsArray.every((hashtag) => hashtagTemplate.test(hashtag));
  const isUnique = !hashtagsArray.slice(0, hashtagsArray.length - 1).includes(hashtagsArray[hashtagsArray.length - 1]);

  if(inputValue.length === 0) {
    return true;
  }

  if(!correctLength) {
    errorMessage = `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`;
    return false;
  } else if (containsOnlyHash) {
    errorMessage = 'Хештег не может состоять только из одной решётки';
    return false;
  } else if (isWhitespaceMissing) {
    errorMessage = 'Хэштеги разделяются пробелами';
    return false;
  } else if(!isMatchingRegExp) {
    errorMessage = 'Хэштег должен состоять из символа # и макс. 19 букв и чисел';
    return false;
  } else if(!isUnique) {
    errorMessage = 'Такой хэштег уже существует';
    return false;
  }

  return correctLength && isMatchingRegExp && isUnique;
};
pristine.addValidator(photoHashtags, validateHashtags, () => errorMessage);

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
pristine.addValidator(photoDescription, validateComment, `Нельзя вводить больше ${MAX_COMMENT_LENGTH} символов`);

photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const resetForm = () => {
  photoUploadElement.value = '';
  photoHashtags.value = '';
  photoDescription.value = '';
  photoEffectLevelElement.value = '';
  pristine.reset();
};

const onDocumentKeydown = (evt) => {
  if(document.activeElement === photoHashtags || document.activeElement === photoDescription) {
    evt.stopPropagation();
  } else if(isEscapeKey(evt)) {
    evt.preventDefault();
    photoEditorModal.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    resetForm();
  }
};

photoUploadElement.addEventListener('change', () => {
  openFormModal(onDocumentKeydown);
});

photoEditorModalCloseButton.addEventListener('click', () => {
  closeFormModal(resetForm, onDocumentKeydown);
});


