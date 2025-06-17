const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileInput = document.querySelector('.img-upload input[type=file]');
const photoPreview = document.querySelector('.img-upload__preview img');
const photoEffectsPreview = document.querySelectorAll('.effects__preview');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if(matches) {
    photoPreview.src = URL.createObjectURL(file);

    photoEffectsPreview.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});

