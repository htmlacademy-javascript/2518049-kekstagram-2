

const photoModal = document.querySelector('.big-picture');
const photoModalImage = photoModal.querySelector('.big-picture__img').querySelector('img');
const photoModalCaption = photoModal.querySelector('.social__caption');
const photoModalCommentsTotal = photoModal.querySelector('.social__comment-total-count');
const photoModalLikesCount = photoModal.querySelector('.likes-count');

const commentBlock = photoModal.querySelector('.social__comments');
const commentTemplate = photoModal.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

const createPhotoModal = (url, description, likes, comments) => {
  photoModalImage.src = url;
  photoModalCaption.textContent = description;
  photoModalLikesCount.textContent = likes;
  photoModalCommentsTotal.textContent = comments.length;
  comments.forEach((comment) => {
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

export {createPhotoModal};
