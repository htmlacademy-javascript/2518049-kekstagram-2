const INITIAL_COMMENTS_COUNT = 5;
const COMMENT_COUNT_STEP = 5;

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

let commentsArray = [];
let commentsCount = INITIAL_COMMENTS_COUNT;

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
  if(hiddenCommentsCount <= COMMENT_COUNT_STEP) {
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
  commentsCount = INITIAL_COMMENTS_COUNT;
  commentsArray = [];
  commentBlock.innerHTML = '';
  commentsLoader.removeEventListener('click', showNextComments);
};

const createPhotoModal = (url, description, likes, comments) => {
  photoModalImage.src = url;
  photoModalCaption.textContent = description;
  photoModalLikesCount.textContent = likes;
  photoModalCommentsTotal.textContent = comments.length;
  if(comments.length <= INITIAL_COMMENTS_COUNT) {
    photoModalCommentsShown.textContent = comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    photoModalCommentsShown.textContent = INITIAL_COMMENTS_COUNT;
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', showNextComments);
  }
  commentsArray = comments;
  showCurrentComments(commentsArray, commentsCount);
};

export {createPhotoModal, clearPreviousComments};
