const photoUploadForm = document.querySelector('.img-upload__form');
const photoHashtags = photoUploadForm.querySelector('.text__hashtags');
const photoDescription = photoUploadForm.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

let errorMessage;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});


const validateHashtags = (value) => {
  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const inputValue = value.toLowerCase().trim();
  const whitespaceMissingInFirst = inputValue.slice(1).includes('#');

  if(inputValue.length === 0) {
    return true;
  }

  if (inputValue.includes(' ')) {
    const hashtagsArray = inputValue.split(' ');
    const correctLength = hashtagsArray.length <= MAX_HASHTAG_COUNT;
    const containsOnlyHash = hashtagsArray.some((hashtagValue) => hashtagValue === '#');
    const whitespaceMissing = hashtagsArray.some((hashtagValue) => hashtagValue.slice(1).includes('#'));
    const isMatchingRegExp = hashtagsArray.every((hashtagValue) => hashtag.test(hashtagValue));
    const isUnique = !hashtagsArray.slice(0, hashtagsArray.length - 1).includes(hashtagsArray[hashtagsArray.length - 1]);
    if(!correctLength) {
      errorMessage = `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`;
      return false;
    } else if (containsOnlyHash) {
      errorMessage = 'Хештег не может состоять только из одной решётки';
      return false;
    } else if (whitespaceMissing) {
      errorMessage = 'Хэштеги разделяются пробелами';
      return false;
    } else if(!isMatchingRegExp) {
      errorMessage = 'Хэштег должен состоять из символа # и макс. 19 букв и чисел';
      return false;
    } else if(!isUnique) {
      errorMessage = 'Такой хэштег уже существует';
      return false;
    } else {
      return correctLength && isMatchingRegExp && isUnique;
    }
  }

  if (inputValue === '#') {
    errorMessage = 'Хештег не может состоять только из одной решётки';
    return false;
  } else if(whitespaceMissingInFirst) {
    errorMessage = 'Хэштеги разделяются пробелами';
    return false;
  } else if(!hashtag.test(inputValue)) {
    errorMessage = 'Хэштег должен состоять из символа # и макс. 19 букв и чисел';
    return false;
  } else {
    return true;
  }
};
pristine.addValidator(photoHashtags, validateHashtags, () => errorMessage);


const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;
pristine.addValidator(photoDescription, validateComment, `Нельзя вводить больше ${MAX_COMMENT_LENGTH} символов`);


photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
