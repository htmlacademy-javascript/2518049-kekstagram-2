import { createPhotoComment } from './create-photo-comments';
import { PHOTO_DESCRIPTIONS_COUNT, DESCRIPTIONS, MESSAGES, NAMES, SURNAMES, likesCount, commentsCount, avatarIndex } from './data';
import { getRandomNumber } from './utils';

const createPhotoDescription = () => {
  let photoId = 1;

  return function () {
    return {
      id: photoId++,
      url: `photos/${photoId - 1}.jpg`,
      description: DESCRIPTIONS[photoId - 2],
      likes: getRandomNumber(likesCount.MIN, likesCount.MAX),
      comments: Array.from({length: getRandomNumber(commentsCount.MIN, commentsCount.MAX)}, createPhotoComment(MESSAGES, NAMES, SURNAMES, avatarIndex))
    };
  };
};

const photoDesciptions = Array.from({length: PHOTO_DESCRIPTIONS_COUNT}, createPhotoDescription());

export {photoDesciptions};
