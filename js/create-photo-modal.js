const photoModal = document.querySelector('.big-picture');
const photoModalImage = photoModal.querySelector('.big-picture__img').querySelector('img');
const photoModalCaption = photoModal.querySelector('.social__caption');
const photoModalCommentsShown = photoModal.querySelector('.social__comment-shown-count');
const photoModalCommentsTotal = photoModal.querySelector('.social__comment-total-count');
const photoModalLikesCount = photoModal.querySelector('.likes-count');

const commentBlock = photoModal.querySelector('.social__comments');
const commentTemplate = photoModal.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

const commentsLoader = photoModal.querySelector('.comments-loader');

const COMMENT_COUNT_STEP = 5;
let commentsArray = [];
let commentsCount = 5;

const showCurrentComments = (comments, currentCommentsCount) => {
  comments.slice(0, currentCommentsCount).forEach((comment) => {
    const {avatar, message, name} = comment;
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentFragment.appendChild(newComment);
  });
  commentBlock.innerHTML = '';
  commentBlock.appendChild(commentFragment);
};

const showNextComments = () => {
  const hiddenCommentsCount = commentsArray.length - commentsCount;
  if(hiddenCommentsCount <= 5) {
    commentsCount += hiddenCommentsCount;
    photoModalCommentsShown.textContent = commentsCount;
    commentsLoader.classList.add('hidden');
  } else {
    commentsCount += COMMENT_COUNT_STEP;
    photoModalCommentsShown.textContent = commentsCount;
  }
  showCurrentComments(commentsArray, commentsCount);
};

const clearPreviousComments = () => {
  commentsCount = 5;
  commentsArray = [];
  commentBlock.innerHTML = '';
  commentsLoader.removeEventListener('click', showNextComments);
};

const createPhotoModal = (url, description, likes, comments) => {
  photoModalImage.src = url;
  photoModalCaption.textContent = description;
  photoModalLikesCount.textContent = likes;
  photoModalCommentsTotal.textContent = comments.length;
  if(comments.length <= 5) {
    photoModalCommentsShown.textContent = comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    photoModalCommentsShown.textContent = 5;
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', showNextComments);
  }
  commentsArray = comments;
  showCurrentComments(commentsArray, commentsCount);
};

export {createPhotoModal, clearPreviousComments};
