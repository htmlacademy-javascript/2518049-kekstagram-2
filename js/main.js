import { getData } from './api';
import { renderPhotos } from './render-photos';
import { setPhotoFormSubmit } from './upload-photo-form';
import { onFilterButtonClick} from './filter-handling';
import { debounce, getUniqueNumbersSet } from './utils';

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let photosCount;
let uniqueIds;

const sortPhotosByDiscussed = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filterById = (photoId) => uniqueIds.has(photoId);

getData()
  .then((photos) => {
    photosCount = photos.length;
    renderPhotos(photos);
    onFilterButtonClick(
      defaultFilterButton,
      debounce(() => renderPhotos(photos), DEBOUNCE_DELAY)
    );
    onFilterButtonClick(
      randomFilterButton,
      debounce(() => {
        uniqueIds = getUniqueNumbersSet(0, photosCount, RANDOM_PHOTOS_COUNT);
        renderPhotos(photos.filter((photo) => filterById(photo.id)));
      }, DEBOUNCE_DELAY)
    );
    onFilterButtonClick(
      discussedFilterButton,
      debounce(() => renderPhotos(photos.slice().sort(sortPhotosByDiscussed)), DEBOUNCE_DELAY)
    );
  });
setPhotoFormSubmit();
