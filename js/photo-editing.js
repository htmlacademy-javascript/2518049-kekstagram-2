const photoEditorModal = document.querySelector('.img-upload__overlay');

const photoPreview = photoEditorModal.querySelector('.img-upload__preview').querySelector('img');

const photoEffectContainer = photoEditorModal.querySelector('.img-upload__effect-level');
const photoEffectLevelElement = photoEditorModal.querySelector('.effect-level__value');
const photoEffectSlider = photoEditorModal.querySelector('.effect-level__slider');
const effectElements = photoEditorModal.querySelectorAll('.effects__radio');

photoEffectContainer.classList.add('hidden');

noUiSlider.create(photoEffectSlider, {
  range: {
    min: 0,
    max:  1
  },
  start: 1,
  step:0.1,
  connect: 'lower'
});

const updateSlider = (minSliderValue, maxSliderValue, sliderStep) => {
  photoEffectSlider.noUiSlider.updateOptions({
    range: {
      min: minSliderValue,
      max:  maxSliderValue
    },
    start: maxSliderValue,
    step: sliderStep,
    connect: 'lower'
  });
};

const changeEffectLevel = (filter) => {
  photoEffectSlider.noUiSlider.off('update');
  photoEffectSlider.noUiSlider.on('update', () => {
    const numericEffectLevel = parseFloat(photoEffectSlider.noUiSlider.get());
    photoEffectLevelElement.value = numericEffectLevel;
    if (filter === 'none') {
      photoPreview.style.filter = filter;
    } else if (filter === 'invert') {
      photoPreview.style.filter = `invert(${numericEffectLevel}%)`;
    } else if (filter === 'blur') {
      photoPreview.style.filter = `blur(${numericEffectLevel}px)`;
    } else {
      photoPreview.style.filter = `${filter}(${numericEffectLevel})`;
    }
  });
};


const adjustEffect = () => {
  for(const effectElement of effectElements) {
    if (effectElement.checked) {
      switch (effectElement.value) {
        case 'none' : {
          photoEffectContainer.classList.add('hidden');
          changeEffectLevel('none');
          break;
        }
        case 'chrome' : {
          photoEffectContainer.classList.remove('hidden');
          updateSlider(0, 1, 0.1);
          changeEffectLevel('grayscale');
          break;
        }
        case 'sepia' : {
          photoEffectContainer.classList.remove('hidden');
          updateSlider(0, 1, 0.1);
          changeEffectLevel('sepia');
          break;
        }
        case 'marvin' : {
          photoEffectContainer.classList.remove('hidden');
          updateSlider(0, 100, 1);
          changeEffectLevel('invert');
          break;
        }
        case 'phobos' : {
          photoEffectContainer.classList.remove('hidden');
          updateSlider(0, 3, 0.1);
          changeEffectLevel('blur');
          break;
        }
        case 'heat' : {
          photoEffectContainer.classList.remove('hidden');
          updateSlider(1, 3, 0.1);
          changeEffectLevel('brightness');
          break;
        }
      }
    }
  }
};

export {adjustEffect};
