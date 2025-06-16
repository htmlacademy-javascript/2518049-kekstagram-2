let currentFilterButton = document.querySelector('.img-filters__button--active');

const onFilterButtonClick = (button, callback) => {
  button.addEventListener('click', (evt) => {
    currentFilterButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilterButton = document.querySelector('.img-filters__button--active');
    callback();
  });
};

export {onFilterButtonClick};
