const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower - 1) + lower;
  return Math.floor(result);
};

const getUniqueNumbersSet = (min = 0, max = 25, numbersCount = 10) => {
  const numbersSet = new Set();
  while (numbersSet.size < numbersCount) {
    numbersSet.add(getRandomNumber(min, max));
  }
  return numbersSet;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const handleMessageAppearance = (message) => {
  document.body.append(message);

  const deleteMessage = () => {
    message.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onCloseButtonClick = () => {
    deleteMessage();
  };

  function onDocumentClick(evt) {
    const isClickInside = message.querySelector('div').contains(evt.target);
    if(!isClickInside) {
      deleteMessage();
    }
  }

  function onDocumentKeydown(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      deleteMessage();
    }
  }

  message.querySelector('button').addEventListener('click', onCloseButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const debounce = (callback, delay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, rest);
    }, delay);
  };
};

export {getRandomNumber, getUniqueNumbersSet, isEscapeKey, handleMessageAppearance, debounce};
