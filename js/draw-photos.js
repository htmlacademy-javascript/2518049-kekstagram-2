// import { photoDesciptions } from './create-photo-descriptions';
import { createPhotoModal } from './create-photo-modal';
import { openPhotoModal } from './toggle-photo-modal';

const photoBlock = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoListFragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach(({url, description, likes, comments}) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = url;
    newPhoto.querySelector('.picture__img').alt = description;
    newPhoto.querySelector('.picture__likes').textContent = likes;
    newPhoto.querySelector('.picture__comments').textContent = comments.length;
    newPhoto.addEventListener('click', () => {
      createPhotoModal(url, description, likes, comments);
      openPhotoModal();
    });
    photoListFragment.appendChild(newPhoto);
  });

  photoBlock.appendChild(photoListFragment);
};

export {renderPhotos};

