const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower - 1) + lower;
  return Math.floor(result);
};

const getArrayItem = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, getArrayItem, isEscapeKey};
