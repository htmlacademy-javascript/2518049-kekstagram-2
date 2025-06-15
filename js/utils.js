const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower - 1) + lower;
  return Math.floor(result);
};

const getArrayItem = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (message) => {
  document.body.append(message);
  message.querySelector('button').addEventListener('click', () => {
    message.remove();
  });
  document.addEventListener('click', (evt) => {
    const isClickInside = message.querySelector('div').contains(evt.target);
    if(!isClickInside) {
      message.remove();
    }
  });
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  });
};

export {getRandomNumber, getArrayItem, isEscapeKey, showMessage};
