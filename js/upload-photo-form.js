import { closeFormModal, openFormModal } from './toggle-form-modal';
import { isEscapeKey } from './utils';
import { adjustEffect } from './photo-editing';
import { sendData } from './api';

const pageBody = document.querySelector('body');

const photoUploadForm = document.querySelector('.img-upload__form');
const photoUploadElement = document.querySelector('.img-upload__input');
const photoEditorModal = document.querySelector('.img-upload__overlay');
const photoEditorModalCloseButton = photoEditorModal.querySelector('.img-upload__cancel');

const photoHashtags = photoUploadForm.querySelector('.text__hashtags');
const photoDescription = photoUploadForm.querySelector('.text__description');

const photoScaleSmaller = photoEditorModal.querySelector('.scale__control--smaller');
const photoScaleBigger = photoEditorModal.querySelector('.scale__control--bigger');
const photoScaleValue = photoEditorModal.querySelector('.scale__control--value');
let photoScaleNumericValue = parseInt(photoScaleValue.value.replace('%', ''), 10);
const photoPreview = photoEditorModal.querySelector('.img-upload__preview').querySelector('img');
const photoEffectContainer = photoEditorModal.querySelector('.img-upload__effect-level');
const photoEffectLevelElement = photoEditorModal.querySelector('.effect-level__value');
const effectElements = photoEditorModal.querySelectorAll('.effects__radio');
const nonEffectElement = photoEditorModal.querySelector('#effect-none');

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

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
  const uniqueHashArray = new Set(hashtagsArray);

  if (inputValue.length === 0) {
    return true;
  }

  if (!correctLength) {
    errorMessage = `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`;
    return false;
  }

  for (const hashtag of hashtagsArray) {
    if (hashtag === '#') {
      errorMessage = 'Хештег не может состоять только из одной решётки';
      return false;
    } else if (hashtag.slice(1).includes('#')) {
      errorMessage = 'Хэштеги разделяются пробелами';
      return false;
    } else if (!hashtagTemplate.test(hashtag)) {
      errorMessage = 'Хэштег должен начинаться с # и содержать до 19 букв или цифр';
      return false;
    }
  }

  if (hashtagsArray.length !== uniqueHashArray.size) {
    errorMessage = 'Такой хэштег уже существует';
    return false;
  }

  return true;
};
pristine.addValidator(photoHashtags, validateHashtags, () => errorMessage);

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
pristine.addValidator(photoDescription, validateComment, `Нельзя вводить больше ${MAX_COMMENT_LENGTH} символов`);

effectElements.forEach((element) => {
  element.addEventListener('change', adjustEffect);
});

photoScaleSmaller.addEventListener('click', () => {
  if (photoScaleNumericValue > MIN_SCALE) {
    photoScaleNumericValue -= SCALE_STEP;
    photoScaleValue.value = `${photoScaleNumericValue}%`;
    photoPreview.style.transform = `scale(0.${photoScaleNumericValue})`;
  }
});

photoScaleBigger.addEventListener('click', () => {
  if (photoScaleNumericValue < MAX_SCALE && SCALE_STEP < MAX_SCALE - photoScaleNumericValue) {
    photoScaleNumericValue += SCALE_STEP;
    photoScaleValue.value = `${photoScaleNumericValue}%`;
    photoPreview.style.transform = `scale(0.${photoScaleNumericValue})`;
  } else if (photoScaleNumericValue < MAX_SCALE && SCALE_STEP >= MAX_SCALE - photoScaleNumericValue) {
    photoScaleNumericValue += SCALE_STEP;
    photoScaleValue.value = `${photoScaleNumericValue}%`;
    photoPreview.style.transform = 'scale(1)';
  }
});

const resetForm = () => {
  photoUploadElement.value = '';
  photoHashtags.value = '';
  photoDescription.value = '';

  photoScaleNumericValue = 100;
  photoScaleValue.value = '100%';
  photoPreview.style.transform = 'scale(1)';

  photoEffectContainer.classList.add('hidden');
  photoEffectLevelElement.value = '';
  photoPreview.style.filter = 'none';
  nonEffectElement.checked = true;

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

const setPhotoFormSubmit = () => {
  photoUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      sendData(new FormData(evt.target))
        .then(() => {
          closeFormModal(resetForm, onDocumentKeydown);
        });
    }
  });
};

export {setPhotoFormSubmit, resetForm, onDocumentKeydown};
