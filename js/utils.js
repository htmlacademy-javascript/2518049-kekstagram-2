const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower - 1) + lower;
  return Math.floor(result);
};

const getArrayItem = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getUniqueNumbersSet = (min = 0, max = 25, numbersCount = 10) => {
  const numbersSet = new Set();
  while (numbersSet.size < numbersCount) {
    numbersSet.add(getRandomNumber(min, max));
  }
  return numbersSet;
};

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

const debounce = (callback, delay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, rest);
    }, delay);
  };
};

export {getRandomNumber, getArrayItem, getUniqueNumbersSet, isEscapeKey, showMessage, debounce};
