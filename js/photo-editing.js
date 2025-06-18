const EffectsValues = {
  CHROME: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1
  },
  SEPIA: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1
  },
  MARVIN: {
    MIN: 0,
    MAX: 100,
    STEP: 1
  },
  PHOBOS: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1
  },
  HEAT: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1
  },
};

const photoEditorModal = document.querySelector('.img-upload__overlay');

const photoPreview = photoEditorModal.querySelector('.img-upload__preview').querySelector('img');

const photoEffectContainerElement = photoEditorModal.querySelector('.img-upload__effect-level');
const photoEffectLevelElement = photoEditorModal.querySelector('.effect-level__value');
const photoEffectSliderElement = photoEditorModal.querySelector('.effect-level__slider');
const effectElements = photoEditorModal.querySelectorAll('.effects__radio');

photoEffectContainerElement.classList.add('hidden');

noUiSlider.create(photoEffectSliderElement, {
  range: {
    min: EffectsValues.CHROME.MIN,
    max: EffectsValues.CHROME.MAX
  },
  start: EffectsValues.CHROME.MAX,
  step: EffectsValues.CHROME.STEP,
  connect: 'lower'
});

const updateSlider = (minSliderValue, maxSliderValue, sliderStep) => {
  photoEffectSliderElement.noUiSlider.updateOptions({
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
  photoEffectSliderElement.noUiSlider.off('update');
  photoEffectSliderElement.noUiSlider.on('update', () => {
    const numericEffectLevel = parseFloat(photoEffectSliderElement.noUiSlider.get());
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

const onPhotoEffectApply = () => {
  for(const effectElement of effectElements) {
    if (effectElement.checked) {
      switch (effectElement.value) {
        case 'none' : {
          photoEffectContainerElement.classList.add('hidden');
          changeEffectLevel('none');
          break;
        }
        case 'chrome' : {
          photoEffectContainerElement.classList.remove('hidden');
          updateSlider(
            EffectsValues.CHROME.MIN,
            EffectsValues.CHROME.MAX,
            EffectsValues.CHROME.STEP
          );
          changeEffectLevel('grayscale');
          break;
        }
        case 'sepia' : {
          photoEffectContainerElement.classList.remove('hidden');
          updateSlider(
            EffectsValues.SEPIA.MIN,
            EffectsValues.SEPIA.MAX,
            EffectsValues.SEPIA.STEP
          );
          changeEffectLevel('sepia');
          break;
        }
        case 'marvin' : {
          photoEffectContainerElement.classList.remove('hidden');
          updateSlider(
            EffectsValues.MARVIN.MIN,
            EffectsValues.MARVIN.MAX,
            EffectsValues.MARVIN.STEP
          );
          changeEffectLevel('invert');
          break;
        }
        case 'phobos' : {
          photoEffectContainerElement.classList.remove('hidden');
          updateSlider(
            EffectsValues.PHOBOS.MIN,
            EffectsValues.PHOBOS.MAX,
            EffectsValues.PHOBOS.STEP
          );
          changeEffectLevel('blur');
          break;
        }
        case 'heat' : {
          photoEffectContainerElement.classList.remove('hidden');
          updateSlider(
            EffectsValues.HEAT.MIN,
            EffectsValues.HEAT.MAX,
            EffectsValues.HEAT.STEP
          );
          changeEffectLevel('brightness');
          break;
        }
      }
    }
  }
};

export {onPhotoEffectApply};
