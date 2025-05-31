import { photoDesciptions } from './create-photo-descriptions';

const photoBlock = document.querySelector('.pictures');

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoListFragment = document.createDocumentFragment();

photoDesciptions.forEach(({url, description, likes, comments}) => {
  const newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__img').alt = description;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  newPhoto.querySelector('.picture__comments').textContent = comments.length;
  photoListFragment.appendChild(newPhoto);
});

photoBlock.appendChild(photoListFragment);

