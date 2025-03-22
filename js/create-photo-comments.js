import { getArrayItem, getRandomNumber } from './utils';

let globalCommentId = 1;

const createPhotoComment = (MESSAGES, NAMES, SURNAMES, avatarIndex) =>
  function () {
    return {
      id: globalCommentId++,
      avatar: `img/avatar-${getRandomNumber(avatarIndex.MIN, avatarIndex.MAX)}.svg`,
      message: `${getArrayItem(MESSAGES)}`,
      name: `${getArrayItem(NAMES)} ${getArrayItem(SURNAMES)}`
    };
  };
export {createPhotoComment};
